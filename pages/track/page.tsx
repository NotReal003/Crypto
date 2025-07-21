// app/track/page.tsx

"use client";
import { useState } from "react";

export default function TrackPage() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const trackOrder = async () => {
    if (!email.includes("@")) return;

    setLoading(true);
    setResult(null);

    const res = await fetch(`/api/order/status?email=${email}`);
    const data = await res.json();

    setLoading(false);
    setResult(data);
  };

  return (
    <main className="min-h-screen bg-zinc-900 text-white px-4 py-10">
      <div className="max-w-xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold mb-4">Track Your Order</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded bg-zinc-800 border border-gray-700"
        />
        <button
          onClick={trackOrder}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 transition px-4 py-3 rounded"
        >
          {loading ? "Checking..." : "Track Order"}
        </button>

        {result && (
          <div className="mt-6 bg-zinc-800 p-4 rounded border border-gray-700">
            {result.success ? (
              <>
                <p><strong>Email:</strong> {result.order.email}</p>
                <p><strong>Tier:</strong> {result.order.tier}</p>
                <p><strong>Status:</strong> {result.order.status}</p>
                {result.order.downloadUrl && (
                  <p>
                    <a
                      href={result.order.downloadUrl}
                      className="text-blue-400 underline"
                      target="_blank"
                    >
                      Download License
                    </a>
                  </p>
                )}
              </>
            ) : (
              <p className="text-red-400">{result.message}</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}