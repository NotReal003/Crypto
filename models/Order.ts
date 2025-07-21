// models/Order.ts

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    txid: { type: String, required: true },
    tier: { type: String, required: true },
    status: { type: String, default: "Pending" }, // or "Delivered"
    downloadLink: { type: String }, // optional download URL
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);