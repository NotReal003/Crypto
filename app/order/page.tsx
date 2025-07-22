// app/order/page.tsx

import OrderSubmitForm from "@/components/OrderSubmitForm";
import OrderTracker from "@/components/OrderTracker";

export default function OrderPage() {
  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Crypto Purchase Portal</h1>
      <OrderSubmitForm />
      <OrderTracker />
    </main>
  );
}