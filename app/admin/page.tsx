// app/admin/page.tsx
import { headers } from "next/headers";
import AdminOrderCard from "@/components/AdminOrderCard";

async function getOrders() {
                          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/orders`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch orders:", res.statusText);
    return [];
  }

  const data = await res.json();
  return data.orders || [];
}

export default async function AdminPage() {
  const orders = await getOrders();

  return (
    <main className="min-h-screen p-6 bg-black text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>
      <div className="max-w-2xl mx-auto">
        {orders.length === 0 ? (
          <p className="text-center">No orders found</p>
        ) : (
          orders.map((order) => <AdminOrderCard key={order._id} order={order} />)
        )}
      </div>
    </main>
  );
}