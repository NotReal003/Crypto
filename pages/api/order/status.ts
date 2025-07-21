// app/api/order/status.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req: NextRequest) {
  await connectDB();
  const email = req.nextUrl.searchParams.get("email");
  const txid = req.nextUrl.searchParams.get("txid");
  const admin = req.nextUrl.searchParams.get("admin");

  if (admin === "true") {
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, orders });
  }

  if (!email || !txid) {
    return NextResponse.json({ success: false, message: "Missing parameters" });
  }

  const order = await Order.findOne({ email, txid });
  if (!order) {
    return NextResponse.json({ success: false, message: "Order not found" });
  }

  return NextResponse.json({ success: true, order });
}