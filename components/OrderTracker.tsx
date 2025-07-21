// components/OrderTracker.tsx

"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function OrderTracker() {
  const [email, setEmail] = useState("");
  const [txid, setTxid] = useState("");
  const [result, setResult] = useState<null | any>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);

    const res = await fetch("/api/order/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, txid }),
    });

    const data = await res.json();
    if (!data.success) {
      toast.error(data.message || "Not found");
      return;
    }

    setResult(data);
  };

  return (
    <div className="glass p-6 rounded-md max-w-md mx-auto mt-12">
      <h2 className="text-xl font-bold text-center mb-4">Track Your Order</h2>
      <form onSubmit={handleTrack} className="space-y-4">
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
        <button type="submit" className="btn-primary w-full">Track Order</button>
      </form>

      {result && (
        <div className="mt-6 text-center">
          <p>Status: <strong>{result.status}</strong></p>
          {result.downloadLink && (
            <p>
              Download:{" "}
              <a href={result.downloadLink} target="_blank" className="text-blue-400 underline">
                Click Here
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}