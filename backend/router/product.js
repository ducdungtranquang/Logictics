import express from "express"
import Order from "../model/Order.js"
import Product from "../model/Product.js"

import { sendError, sendServerError, sendSuccess } from "../helper/client.js"
import { verifyToken, verifyCustomer} from '../middleware/index.js'
import { addProductValidate } from "../validation/product.js"

const productRoute = express.Router()

/**
 * @route POST api/product/:orderId
 * @description customer add product to their order
 * @access public
 */
productRoute.post('/:orderId',
    verifyToken,
    verifyCustomer,
    async (req, res) => {
        try {
            const customerId = req.user.role._id
            const {orderId} = req.params
            const {products} = req.body
            const order = await Order.findOne({orderId: orderId, customer:customerId})
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
 * @route GET api/product/:orderId
 * @description customer add product to their order
 * @access public
 */
productRoute.get('/:orderId',
    verifyToken,
    verifyCustomer,
    async (req, res) => {
        try {
            const customerId = req.user.role._id
            const {orderId} = req.params
            const order = await Order.findOne({orderId: orderId, customer: customerId})
            if (!order) return sendError(res, "Order is not found.")
            
            const products = await Product.find({order})

            return sendSuccess(res, "Get product successfully", products)
            
        } catch (error) {
            console.log(error)
            return sendServerError(res)
        }
    }
)

/**
 * @route  PUT api/product/:productId
 * @description customer update product
 * @access public
 */
productRoute.put('/:productId',
    verifyToken,
    verifyCustomer,
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
 * @route DELETE api/product/:productId
 * @description customer update product
 * @access public
 */
productRoute.delete('/:productId',
    verifyToken,
    verifyCustomer,
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


export default productRoute