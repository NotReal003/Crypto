// models/Order.ts
import mongoose, { Document, Schema, Model } from "mongoose";

export interface IOrder extends Document {
  email: string;
  txid: string;
  tier: string;
  status: string;
  downloadLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    email: { type: String, required: true },
    txid: { type: String, required: true },
    tier: { type: String, required: true },
    status: { type: String, default: "pending" },
    downloadLink: { type: String },
  },
  { timestamps: true }
);

// 👇 Very important for TypeScript to get correct type inference
const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;