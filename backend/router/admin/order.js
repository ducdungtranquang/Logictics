import express from "express"
import { sendError, sendServerError, sendSuccess } from "../../helper/client.js"
import { createOrderValidate } from "../../validation/order.js"
import { verifyToken } from '../../middleware/index.js'
import { genarateOrderID } from "../../service/order.js"
import DeliveryService from '../../model/DeliveryService.js'
import Order from "../../model/Order.js"
import User from "../../model/User.js"
import Customer from "../../model/Customer.js"
import Receiver from "../../model/Receiver.js"

const orderAdminRoute = express.Router()

/**
 * @route GET /api/admin/order
 * @description get list of order
 * @access private
 */
orderAdminRoute.get('/', async (req, res) => {
    try {
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0
        const page = req.query.page ? parseInt(req.query.page) : 0
        const {customerName, customerPhone, customerEmail, sortBy, status} = req.query
        var query = {}        
        if(customerName)           
            query.customer = await Customer.findOne({name : customerName})
        if(customerPhone) {
            const customer = await User.findOne({phone : customerPhone})
            if (customer)
                query.customer = customer.role
        }
        if(customerEmail) {
            const customer = await User.findOne({email : customerEmail})
            if(customer)
                query.customer = customer.role
        }
        if(status)
            query.status = status
        const orders = await Order.find(query).skip(pageSize*page).limit(pageSize).sort(sortBy)
        var length = await Order.find(query).count()
        if (orders)
            return sendSuccess(res, 'get order information successfully.', {length, orders})
        return sendError(res, 'order information is not found.', {length})
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})


/**
 * @route GET /api/admin/order/:orderId
 * @description get an order by orderId
 * @access private
 */
orderAdminRoute.get('/:orderId', async (req, res) => {
    try {
        const {orderId} = req.params
        const order = await Order.findOne({orderId})
        if (order)
            return sendSuccess(res, 'get order information successfully.', order)
        return sendError(res, 'order information is not found.')
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})

/**
 * @route PUT /api/admin/order/:orderId
 * @description update status order by orderId
 * @access private
 */
orderAdminRoute.put('/:orderId', async (req, res) => {
    try {
        const {orderId} = req.params
        const {status} = req.body
        const order = await Order.findOneAndUpdate({orderId}, {status: status})
        if (order)
            return sendSuccess(res, 'update order information successfully.', order)
        return sendError(res, 'order information is not found.')
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})

/**
 * @route DELETE /api/admin/order/:orderId
 * @description admin delete order by orderId
 * @access private
 */
orderAdminRoute.delete('/:orderId', async (req, res) => {
    try {
        const {orderId} = req.params
        const order = await Order.findOneAndRemove({orderId})
        if (order)
            return sendSuccess(res, 'delete order information successfully.', order)
        return sendError(res, 'order information is not found.')
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})

export default  orderAdminRoute