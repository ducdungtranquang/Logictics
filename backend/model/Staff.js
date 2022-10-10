import mongoose from "mongoose"
import { STAFF } from "../constant.js"
const { Schema } = mongoose

const StaffSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        staff_type: {
            type: String,
            enum: Object.values(STAFF),
            required: true,
            default: STAFF.STAFF
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: 'department'
        },
        car_fleet: {
            type: Schema.Types.ObjectId,
            ref: 'car_fleets'
        }
    },
    { timestamps: true }
)

export default mongoose.model('staffs', StaffSchema)
