import mongoose from "mongoose"
import { ORDER_STATUS } from "../constant.js"
const { Schema } = mongoose

const OrderSchema = new Schema(
    {
        orderId: {
            type: String,
            unique: true,
            required: true
        },
        service: {
            type: Schema.Types.ObjectId,
            ref: 'delivery_services',
            required: true
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'customers',
            required: true
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: 'receivers',
            required: true
        },
        total_price: Number,
        status: {
            type: String,
            enum: Object.values(ORDER_STATUS),
            default: ORDER_STATUS.waiting,
            required: true
        },
        origin: {
            type: String,
            required: true
        },
        destination: {
            type: String,
            required: true
        },
        feedback: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'users',
                    required: true
                },
                content: {
                    type: String,
                    required: true
                }
            },
            { timestamps: true }
        ]
    },
    { timestamps: true }
)

export default mongoose.model('orders', OrderSchema)