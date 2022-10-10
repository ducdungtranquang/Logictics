import express from "express"
import { sendError, sendServerError, sendSuccess } from "../../helper/client.js"
import ProductShipment from "../../model/ProductShipment.js"
import Product from "../../model/Product.js"
import { createProductShipmentValidate } from "../../validation/productShipment.js"
import Order from "../../model/Order.js"
import DeliveryService from "../../model/DeliveryService.js"
import Price from "../../model/Price.js"
import Distance from "../../model/Distance.js"
import { calculateShipmentFee } from "../../service/order.js"


const productShipmentAdminRoute = express.Router()

/**
 * @route GET /api/admin/product-shipment
 * @description get about information of product shipment
 * @access private
 */
productShipmentAdminRoute.get('/',
    async (req, res) => {
        try {
            const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0
            const page = req.query.page ? parseInt(req.query.page) : 0
            const { keyword, sortBy, limit, product_id } = req.query
            console.log(product_id)

            var query = {};
            var keywordList = keyword
                ? {
                    $or: [
                        { product_id: { $regex: keyword, $options: "i" } },
                    ],
                }
                : {};

            if (product_id) {
                query.product_id = product_id;
            }

            const length = await ProductShipment.find({ $and: [query, keywordList] }).count()
            const listProductShipment = await ProductShipment.find({ $and: [query, keywordList] })
                .limit(pageSize)
                .skip(pageSize * page)
                .sort(`${sortBy}`)

            if (listProductShipment)
                return sendSuccess(res, "Get product shipment information successfully", { length, listProductShipment });

            return sendError(res, "Product shipment not found")

        } catch (error) {
            console.log(error)
            return sendServerError(res)
        }
    }
)

/**
* @route GET /api/admin/product-shipment/:id
* @description get about information of product shipment by id
* @access private
*/
productShipmentAdminRoute.get('/:id',
    async (req, res) => {
        try {
            const { id } = req.params
            const productShipments = await ProductShipment.findById(id)
            if (productShipments) return sendSuccess(res, "Get product shipment successful.", productShipments)
            return sendError(res, "Not information found.")
        } catch (error) {
            console.log(error)
            return sendServerError(res)
        }
    })

/**
 * @route GET /api/product-shipment/product/:id
 * @description get product-shipment information for a given product id
 * @access public
 */

productShipmentAdminRoute.get("/product/:id", async (req, res) => {
    try {
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const { id } = req.params;
        const product = await Product.findById({ _id: id });
        if (!product) return sendError(res, "Product does not exist.");

        if (product) {
            const ids = [];
            for (let i = 0; i < product.product_shipments.length; i++) {
                if (product.product_shipments.length) {
                    ids.push(product.product_shipments[i]);
                }
            }
            const length = await ProductShipment.count();
            const productShipment = await ProductShipment.find({ _id: ids })
                .limit(pageSize)
                .skip(pageSize * page);
            return sendSuccess(res, "get product shipment information successfully.", {
                length,
                productShipment,
            });
        }
        return sendError(res, "Product shipment information is not found.");
    } catch (error) {
        console.log(error);
        return sendServerError(res);
    }
});

/**
 * @route POST /api/admin/product-shipment/create
 * @description create information of product shipment
 * @access private
 */
productShipmentAdminRoute.post('/create/:product_id', async (req, res) => {
    const errors = createProductShipmentValidate(req.body)
    if (errors)
        return sendError(res, errors)

    try {
        const { quantity } = req.body
        const { product_id } = req.params
        //check quantity 
        if (quantity < 1)
            return sendError(res, "Quantity is not less than 1")

        //check productID
        const isExistProductID = await Product.exists({ _id: product_id })
        if (!isExistProductID)
            return sendError(res, "Product id is not exists")

        //get quantity of product
        const productid = await Product.findById({ _id: product_id })
        const productQuantity = productid.quantity
        const productUnit = productid.unit
        const productOrder = productid.order.toString()
        // console.log(productOrder)

        //get object order from product
        const orderID = await Order.findById({ _id: productOrder })
        const orderService = orderID.service.toString()

        //get price, distance from DeliveryService
        const delivery = await DeliveryService.findById({ _id: orderService })

        const deliveryPriceID = delivery.price.toString()
        const deliveryDistanceID = delivery.distances

        const price = await Price.findById({ _id: deliveryPriceID })

        //get origin, destination from Order collection
        const orderIDOrigin = orderID.origin
        const orderIDDestination = orderID.destination
        //console.log(orderIDOrigin, orderIDDestination)

        //compare distance(fromProvince, toProvince) with order (origin, destination)
        let distance
        for (let i = 0; i < deliveryDistanceID.length; i++) {
            const fromProvince = await Distance.findById({ _id: deliveryDistanceID[i].toString() })
            const toProvince = await Distance.findById({ _id: deliveryDistanceID[i].toString() })
            //console.log(fromProvince.fromProvince, toProvince.toProvince)
            if (fromProvince.fromProvince == orderIDOrigin
                && toProvince.toProvince == orderIDDestination) {
                const temp = await Distance.findById({ _id: deliveryDistanceID[i].toString() })
                distance = temp
            }
            else
                return sendError(res, "City names do not match")
        }
        //count by calculateShipmentFee function and retunr value 
        //distance = distance, quantity = productQuantity, price = price, unit = productUnit
        let value = calculateShipmentFee(distance, productQuantity, price, productUnit)

        //get all productshipment in product
        const productShipment = await Product.findById({ _id: product_id })
        const productShipmentQuantity = productShipment.product_shipments
        // console.log(productShipmentQuantity)
        //get all product by productID in productshipment
        
        let temp = 0
        for (let i = 0; i < productShipmentQuantity.length; i++) {
            const quantityProductShipment = await ProductShipment.findById({ _id: (productShipmentQuantity[i]) })
            // console.log(quantityProductShipment.quantity)
            temp += quantityProductShipment.quantity
        }
        let quantityPresent = Number(quantity) + temp
        
        //compare
        if (productQuantity >= quantityPresent) {
            const ps = await ProductShipment.create({ quantity, value })
            //update product
            const updateProduct = await Product.findOneAndUpdate(
                { _id: product_id },
                { $push: { product_shipments: ps } }
              );
            if (!updateProduct)
                return sendError(res, "Update failed")
            return sendSuccess(res, 'Set product shipment information successfully')
        }
        else
            return sendError(res, "Product_shipment quantity over load current product quantity. Current product quantity: " + productQuantity)

    }
    catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})

/**
 * @route PUT /api/admin/product-shipment/:id
 * @description update information of product shipment
 * @access private
 */
productShipmentAdminRoute.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity, productId } = req.body
        if (!quantity) return sendError(res, "Quantity is required")

        if (quantity < 1)
            return sendError(res, "Quantity is not less than 1")

        //get quantity of product
        const productid = await Product.findById({ _id: productId })
        const productQuantity = productid.quantity
        const productUnit = productid.unit
        const productOrder = productid.order.toString()

        //get object order from product
        const orderID = await Order.findById({ _id: productOrder })
        const orderService = orderID.service.toString()

        //get price, distance from DeliveryService
        const delivery = await DeliveryService.findById({ _id: orderService })

        const deliveryPriceID = delivery.price.toString()
        const deliveryDistanceID = delivery.distances

        const price = await Price.findById({ _id: deliveryPriceID })

        //get origin, destination from Order collection
        const orderIDOrigin = orderID.origin
        const orderIDDestination = orderID.destination

        //compare distance(fromProvince, toProvince) with order (origin, destination)
        let distance
        for (let i = 0; i < deliveryDistanceID.length; i++) {
            const fromProvince = await Distance.findById({ _id: deliveryDistanceID[i].toString() })
            const toProvince = await Distance.findById({ _id: deliveryDistanceID[i].toString() })
            //console.log(fromProvince.fromProvince, toProvince.toProvince)
            if (fromProvince.fromProvince == orderIDOrigin
                && toProvince.toProvince == orderIDDestination) {
                const temp = await Distance.findById({ _id: deliveryDistanceID[i].toString() })
                distance = temp
            }
            else
                return sendError(res, "City names do not match")
        }

        //count by calculateShipmentFee function and retunr value 
        //distance = distance, quantity = productQuantity, price = price, unit = productUnit
        let value = calculateShipmentFee(distance, productQuantity, price, productUnit)

        //get all productshipment in product
        const productShipment = await Product.findById({ _id: productId })
        const productShipmentQuantity = productShipment.product_shipments
        //console.log(productShipmentQuantity)

        //get all product by productID in productshipment
        let temp = 0
        for (let i = 0; i < productShipmentQuantity.length; i++) {
            if (productShipmentQuantity[i].toString() != id) {
                //console.log(productShipmentQuantity[i].toString())
                const quantityProductShipment = await ProductShipment.findById({ _id: (productShipmentQuantity[i].toString()) }, { quantity: true })
                temp += quantityProductShipment.quantity
            }
        }
        let quantityPresent = Number(quantity) + temp
        //console.log(quantityPresent)
        //Compare
        if (productQuantity >= quantityPresent) {
            await ProductShipment.findByIdAndUpdate(id, { quantity, value })
            return sendSuccess(res, 'Update product shipment information successfully')
        }
        else
            return sendError(res, "Product_shipment quantity over load current product quantity")
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})


/**
 * @route DELETE /api/admin/product-shipment/:id
 * @description delete a product shipment existing 
 * @access private
 */
productShipmentAdminRoute.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const isExit = await ProductShipment.exists({ _id: id })
        if (!isExit)
            return sendError(res, "Product shipment not exists")

        //delete document "product_shipment" in "prouct" collection
        await Product.updateMany({}, { $pull: { product_shipments: id } });

        const data = await ProductShipment.findByIdAndRemove(id)
        return sendSuccess(res, "Delete product shipment successfully.", data)

    }
    catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})


export default productShipmentAdminRoute