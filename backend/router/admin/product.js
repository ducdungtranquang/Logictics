import express from "express"
import Order from "../../model/Order.js"
import Product from "../../model/Product.js"

import { sendError, sendServerError, sendSuccess } from "../../helper/client.js"
import { verifyToken, verifyCustomer} from "../../middleware/index.js"
import { addProductValidate } from "../../validation/product.js"

const productAdminRoute = express.Router()


/**
 * @route GET api/admin/product
 * @description admin get list of products
 * @access private
 */
productAdminRoute.get('/',
    async (req, res) => {
        try {
            const {page, pageSize, sortBy, keyword, orderId} = req.query 
            var keywordCondition = keyword ? { $or:[
                { name: { $regex: keyword, $options: 'i'} },
                { unit: { $regex: keyword, $options: 'i'} },
            ]} : {}            
            
            var filterCondition = {}
            if (orderId){
                const order = await Order.findOne({orderId})
                filterCondition = {order : order._id}
            }
            const products = await Product.find({
                $and: [            
                    filterCondition,
                    keywordCondition                
                ]
            }).skip(pageSize*page).limit(pageSize).sort(`${sortBy}`)

            return sendSuccess(res, "Get product successfully", products)
            
        } catch (error) {
            console.log(error)
            return sendServerError(res)
        }
    }
)

/**
 * @route POST api/admin/product/:orderId
 * @description admin add product to customer's order
 * @access public
 */
productAdminRoute.post('/:orderId',
    async (req, res) => {
        try {
            const {orderId} = req.params
            const {products} = req.body            
            const order = await Order.findOne({orderId: orderId})
            if (!order) return sendError(res, "Order is not found.")
            if (order.status !== "waiting") return sendError(res, "Orders can't add more products.")
            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                const errors = addProductValidate(product)
                if (errors) return sendError(res, errors)
                const _product = await Product.create({name: product.name, quantity: product.quantity, unit: product.unit, order})
            }
            return sendSuccess(res, "Add product to order successfully", products)
            
        } catch (error) {
            console.log(error)
            return sendServerError(res)
        }
    }
)

/**
* @route  PUT api/admin/product/:productId
* @description admin update product information
* @access public
*/
productAdminRoute.put('/:productId',
    async (req, res) => {
        try {
            const {productId} = req.params
            const product = await Product.findOne({_id: productId})
            if (!product)
                return sendError(res, "Product not exists")
            const order = await Order.findOne({_id: product.order})
            if (!order) 
                return sendError(res, "Order for this product is not found.")
            if (order.status !== "waiting") 
                return sendError(res, "Product can't be changed")
            
            const {name, quantity, unit} = req.body
            await Product.findByIdAndUpdate(productId, {name, quantity, unit})            
            return sendSuccess(res, "Update product successfully")
        } catch (error) {
            console.log(error)
            return sendServerError(res)
        }
    }
    )


/**
* @route DELETE api/admin/product/:productId
* @description admin update product
* @access public
*/
productAdminRoute.delete('/:productId',
    async (req, res) => {
        try {
            const {productId} = req.params
            const product = await Product.findOne({_id: productId})
            if (!product)
                return sendError(res, "Product not exists")
            const order = await Order.findOne({_id: product.order})
            if (!order) 
                return sendError(res, "Order for this product is not found.")
            if (order.status !== "waiting") 
                return sendError(res, "Product can't be changed")
                
            await Product.findByIdAndRemove(productId)            
            return sendSuccess(res, "Delete product successfully")
        } catch (error) {
            console.log(error)
            return sendServerError(res)
        }
    }
)



export default productAdminRoute
