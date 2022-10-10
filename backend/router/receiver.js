import express from "express";
import Receiver from "../model/Receiver.js";
import { sendError, sendServerError, sendSuccess } from "../helper/client.js"
import { verifyToken, verifyCustomer} from '../middleware/index.js'
import Order from "../model/Order.js"
import { ORDER_STATUS } from "../constant.js";

const receiverRoute = express.Router();


receiverRoute.put('/:id',
    verifyToken, 
    verifyCustomer,
    async (req, res) => {
        const id = req.params.id
        const {name, phone, identity} = req.body
        const customerId = req.user.role._id
        const order = await Order.findOne({_id: id, customer: customerId})
        if (!order) {return sendError(res, 'Order not found')}
        
        if (order.status === ORDER_STATUS.waiting) {
            try {
                const receiverId = order.receiver
                await Receiver.findByIdAndUpdate(receiverId, {name: name, phone: phone, identity: identity});
                return sendSuccess(res,"Receiver updated successfully");
            }
            catch (err) {
                return sendServerError(res);
            }
        } else {
            return sendError(res, "Cannot update receiver while order is completed");
        }
    })
export default receiverRoute;