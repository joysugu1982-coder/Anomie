// "use client";

// import { useEffect, useState } from "react";

// export default function OrdersPage() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("customer_token");
//     if (!token) return;

//     fetch("/api/orders", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setOrders(data));
//   }, []);

//   return (
//     <div>
//       <h1>Your Orders</h1>
//       {orders.length === 0 && <p>No orders yet.</p>}
//       {orders.map((o) => (
//         <div key={o.id}>Order #{o.orderNumber}</div>
//       ))}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Order {
  id: string;
  orderNumber: number;
  processedAt: string;
  fulfillmentStatus: string;
  totalPriceSet: {
    shopMoney: { amount: string; currencyCode: string };
  };
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("customer_token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    fetch("/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="auth-wrapper">
        <div className="auth-card">Loading orders...</div>
      </div>
    );

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Your Orders</h1>

        {orders.length === 0 && (
          <p style={{ textAlign: "center", fontSize: 16, opacity: 0.7 }}>
            You don’t have any orders yet.
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                padding: "14px 18px",
                background: "rgba(255,255,255,0.7)",
                borderRadius: 14,
                border: "1px solid #ddd",
              }}
            >
              <p style={{ fontWeight: 600 }}>
                Order #{order.orderNumber}
              </p>

              <p style={{ fontSize: 14, opacity: 0.8 }}>
                Date: {new Date(order.processedAt).toLocaleDateString()}
              </p>

              <p
                style={{
                  fontSize: 14,
                  marginTop: 6,
                  color:
                    order.fulfillmentStatus === "FULFILLED"
                      ? "green"
                      : order.fulfillmentStatus === "CANCELLED"
                      ? "red"
                      : "#444",
                }}
              >
                Status: {order.fulfillmentStatus}
              </p>

              <p style={{ marginTop: 6, fontWeight: 500 }}>
                Total:{" "}
                {order.totalPriceSet.shopMoney.amount}{" "}
                {order.totalPriceSet.shopMoney.currencyCode}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
