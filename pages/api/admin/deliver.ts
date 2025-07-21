// pages/api/admin/deliver.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { sendDeliveryEmail } from "@/lib/mailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { email, txid, zipLink } = req.body;

  if (!email || !txid || !zipLink) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await connectDB();

    const order = await Order.findOne({ email, txid });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "delivered";
    order.downloadLink = zipLink;
    await order.save();

    await sendDeliveryEmail(email, zipLink);

    res.status(200).json({ success: true, message: "Order delivered successfully" });
  } catch (err) {
    console.error("Delivery error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}