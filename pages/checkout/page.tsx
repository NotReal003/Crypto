// app/checkout/page.tsx

"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const wallets = {
  BTC: "bc1q34jkfqha3xe64mvw730rs33xnvtznrkdzw3mfs",
  LTC: "ltc1q3hw0fz2wl95w0x3jef3qcrmtm64hn3d4ldm4lt",
  USDT: "0x9aFec3eE5527Efd9d10e377b895Ab2b316494608",
  ETH: "0x9aFec3eE5527Efd9d10e377b895Ab2b316494608",
};

export default function CheckoutPage() {
  const [tier, setTier] = useState("Personal");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!email.includes("@")) {
      toast.error("Enter a valid email.");
      return;
    }

    const res = await fetch("/api/order/submit", {
      method: "POST",
      body: JSON.stringify({ tier, email }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Order created. Check payment instructions.");
    } else {
      toast.error(data.message || "Failed to create order.");
    }
  };

  const price = tier === "Personal" ? 49 : tier === "Developer" ? 99 : 199;

  return (
    <main className="min-h-screen bg-zinc-900 text-white px-4 py-10">
      <div className="max-w-xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold">Purchase License</h2>

        <label className="block">Select License:</label>
        <select
          value={tier}
          onChange={(e) => setTier(e.target.value)}
          className="bg-zinc-800 border border-gray-700 px-4 py-2 rounded w-full"
        >
          <option>Personal</option>
          <option>Developer</option>
          <option>Extended</option>
        </select>

        <label className="block">Your Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-zinc-800 border border-gray-700 px-4 py-2 rounded w-full"
          placeholder="you@example.com"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 transition px-4 py-3 rounded mt-4"
        >
          Generate Order
        </button>

        <div className="mt-10 space-y-2">
          <p className="text-sm text-gray-300">
            💸 Send exactly <strong>${price}</strong> to one of the wallets below:
          </p>
          <ul className="text-sm">
            <li><strong>BTC:</strong> {wallets.BTC}</li>
            <li><strong>LTC:</strong> {wallets.LTC}</li>
            <li><strong>USDT (ERC20):</strong> {wallets.USDT}</li>
            <li><strong>ETH:</strong> {wallets.ETH}</li>
          </ul>
          <p className="text-yellow-400 mt-2">
            ✅ After payment, your license will be delivered to your email automatically.
          </p>
        </div>
      </div>
    </main>
  );
}