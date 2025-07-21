// components/AdminOrderCard.tsx

"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  order: {
    _id: string;
    email: string;
    txid: string;
    tier: string;
    status: string;
    createdAt: string;
  };
}

export default function AdminOrderCard({ order }: Props) {
  const [loading, setLoading] = useState(false);
  const [delivered, setDelivered] = useState(order.status === "Delivered");

  const handleDeliver = async () => {
    if (delivered) return;

    const link = prompt("Enter download link (zip):");
    if (!link) return toast.error("Link is required");

    setLoading(true);
    const res = await fetch("/api/admin/deliver", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: order._id, link }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      toast.success("Order marked delivered");
      setDelivered(true);
    } else {
      toast.error(data.message || "Failed to deliver");
    }
  };

  return (
    <div className="glass p-4 rounded-md mb-4">
      <p><strong>Email:</strong> {order.email}</p>
      <p><strong>TXID:</strong> {order.txid}</p>
      <p><strong>Tier:</strong> {order.tier}</p>
      <p><strong>Status:</strong> {delivered ? "Delivered" : "Pending"}</p>
      <p><strong>Time:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      {!delivered && (
        <button
          onClick={handleDeliver}
          className="btn-primary mt-3"
          disabled={loading}
        >
          {loading ? "Sending..." : "Mark as Delivered"}
        </button>
      )}
    </div>
  );
}