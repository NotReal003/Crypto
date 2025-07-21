// models/Order.ts

import mongoose, { Document, Schema } from "mongoose";

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

const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;