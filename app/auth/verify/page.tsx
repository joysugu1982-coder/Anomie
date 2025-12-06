// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useState } from "react";
// import { activateCustomer } from "@/lib/shopify/customer";

// export default function VerifyPage() {
//   const params = useSearchParams();
//   const router = useRouter();

//   const customerId = params.get("id")!;
//   const email = params.get("email")!;
//   const [code, setCode] = useState("");

//   const handleVerify = async () => {
//     const res = await activateCustomer(customerId, code);
//     const result = res.data.customerActivate;

//     if (result.customerUserErrors?.length) {
//       alert(result.customerUserErrors[0].message);
//       return;
//     }

//     const token = result.customerAccessToken.accessToken;

//     // SAVE SESSION RIGHT AFTER VERIFY
//     localStorage.setItem("shopify_token", token);

//     router.push("/");
//   };

//   return (
//     <div className="auth-screen">
//       <h1>Verify your account</h1>
//       <p>We sent a verification code to <b>{email}</b></p>

//       <input
//         placeholder="Verification Code"
//         onChange={(e) => setCode(e.target.value)}
//       />

//       <button onClick={handleVerify}>Verify</button>
//     </div>
//   );
// }

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyPage() {
  const params = useSearchParams();
  const router = useRouter();

  const email = params.get("email");
  const [code, setCode] = useState("");

  async function verify() {
    const res = await fetch("/api/customer/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();
    if (data.accessToken) {
      localStorage.setItem("customer_token", data.accessToken);
      router.push("/profile");
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Enter Code</h1>

        <input
          className="auth-input"
          placeholder="6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button className="auth-button" onClick={verify}>
          Verify
        </button>
      </div>
    </div>
  );
}
