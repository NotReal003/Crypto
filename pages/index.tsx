// app/page.tsx

import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-zinc-800 text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold">
          Request Management Portal
        </h1>
        <p className="text-gray-300 text-lg">
          A production-ready portal for handling user requests, reporting, admin dashboards, and more — sold under 3 license tiers.
        </p>

        <div className="space-x-4 mt-6">
          <Link
            href="/checkout"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
          >
            Buy Now
          </Link>
          <Link
            href="/track"
            className="border border-gray-300 hover:border-white px-6 py-3 rounded-lg transition"
          >
            Track Order
          </Link>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold">Available Licenses</h3>
          <ul className="mt-4 text-gray-300 space-y-2">
            <li>✅ Personal License – $49 (Single use)</li>
            <li>✅ Developer License – $99 (Multi-project use)</li>
            <li>✅ Extended/White-label – $199 (Resell allowed)</li>
          </ul>
        </div>
      </div>
    </main>
  );
}