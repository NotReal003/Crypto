// pages/api/order/submit.ts

import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { email, txid, tier } = req.body;

  if (!email || !txid || !tier)
    return res.status(400).json({ success: false, message: "Missing fields" });

  try {
    await connectDB();

    const existing = await Order.findOne({ txid });
    if (existing) {
      return res.status(409).json({ success: false, message: "Transaction already submitted" });
    }

    const order = await Order.create({ email, txid, tier });
    return res.status(201).json({ success: true, orderId: order._id });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
}