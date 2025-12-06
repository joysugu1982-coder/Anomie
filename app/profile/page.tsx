// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function ProfilePage() {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("customer_token");
//     if (!token) router.replace("/auth/login");
//   }, []);

//   return (
//     <div className="page">
//       <h1>My Profile</h1>
//       <a href="/orders">Orders</a>
//       <a href="/settings">Settings</a>
//       <a href="/logout">Logout</a>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Customer } from "@/types/shopify";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<Customer | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("customer_token");
    if (!token) return router.push("/auth/login");

    fetch("/api/customer/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setUser(data.customer ?? null));
  }, []);

  if (!user)
    return (
      <div className="auth-wrapper">
        <div className="auth-card">Loading...</div>
      </div>
    );

  return (
    <div className="auth-wrapper">
      <div
        className="auth-card"
        style={{
          textAlign: "center",
          paddingTop: 40,
          paddingBottom: 40,
        }}
      >
        {/* Profile Image */}
        <img
          src="/profile-icon.svg"
          alt="profile"
          style={{
            width: 90,
            height: 90,
            margin: "0 auto 20px",
            opacity: 0.85
          }}
        />

        {/* User Name */}
        <h2
          style={{
            fontSize: 24,
            fontWeight: 600,
            marginBottom: 5,
          }}
        >
          {user.firstName} {user.lastName}
        </h2>

        {/* Email */}
        <p
          style={{
            fontSize: 15,
            color: "var(--text)",
            opacity: 0.7,
            marginBottom: 30,
          }}
        >
          {user.email}
        </p>

        {/* Buttons Grid */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 15,
            marginTop: 20,
          }}
        >
          <a className="auth-button" href="/orders">
            🛒 View Orders
          </a>

          <a className="auth-button" href="/settings">
            ⚙️ Settings
          </a>

          <a
            className="auth-button"
            href="/logout"
            style={{ background: "#d33" }}
          >
            🚪 Logout
          </a>
        </div>
      </div>
    </div>
  );
}
