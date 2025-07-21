// components/OrderSubmitForm.tsx

"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function OrderSubmitForm() {
  const [email, setEmail] = useState("");
  const [txid, setTxid] = useState("");
  const [tier, setTier] = useState("Personal");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !txid || !tier) return toast.error("Fill all fields");

    const res = await fetch("/api/order/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, txid, tier }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Order submitted! Wait for delivery.");
      setEmail("");
      setTxid("");
    } else {
      toast.error(data.message || "Failed to submit");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass p-6 rounded-md space-y-4 max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold text-center">Submit Your Purchase</h2>
      <input
        type="email"
        placeholder="Your Email"
        className="input-style"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Transaction ID"
        className="input-style"
        value={txid}
        onChange={(e) => setTxid(e.target.value)}
      />
      <select value={tier} onChange={(e) => setTier(e.target.value)} className="input-style">
        <option value="Personal">Personal - $49</option>
        <option value="Developer">Developer - $99</option>
        <option value="Extended">Extended (White-label) - $199</option>
      </select>
      <button type="submit" className="btn-primary w-full">Submit Order</button>
    </form>
  );
}