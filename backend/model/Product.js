import mongoose from "mongoose";
import { PRODUCT_UNIT } from "../constant.js";
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      enum: Object.values(PRODUCT_UNIT),
      required: true
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'orders',
      required: true
    },
    product_shipments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'product_shipments'
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("products", ProductSchema);
