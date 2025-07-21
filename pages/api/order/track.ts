// pages/api/order/track.ts

import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { email, txid } = req.body;

  try {
    await connectDB();
    const order = await Order.findOne({ email, txid });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({ success: true, status: order.status, downloadLink: order.downloadLink });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
}