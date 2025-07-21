// pages/api/admin/deliver.ts

import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { sendMail } from "@/lib/mailer";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { id, link } = req.body;

  if (!id || !link) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    order.status = "Delivered";
    order.downloadLink = link;
    await order.save();

    // Send email to buyer
    await sendMail({
      to: order.email,
      subject: "Your RMP Purchase is Ready",
      html: `<p>Thank you for purchasing <strong>${order.tier}</strong> license.</p>
        <p>Your download link: <a href="${link}" target="_blank">${link}</a></p>
        <p>Keep this safe. Enjoy using the Request Management Portal.</p>`,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}