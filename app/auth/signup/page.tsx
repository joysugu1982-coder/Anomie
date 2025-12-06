// "use client";

// export default function SignupPage() {
//   const SHOP_URL = "https://anomiesd.myshopify.com";

//   const signupUrl = `${SHOP_URL}/account/login?return_url=${encodeURIComponent(
//     "http://localhost:3000/auth/callback"
//   )}`;

//   return (
//     <div className="auth-screen">
//       <h1>Create your account</h1>

//       <button onClick={() => (window.location.href = signupUrl)}>
//         Continue with Email
//       </button>
//     </div>
//   );
// }

"use client";

import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function sendCode() {
    await fetch("/api/customer/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setSent(true);
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {!sent ? (
          <>
            <h1 className="auth-title">Create your account</h1>

            <input
              className="auth-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="auth-button" onClick={sendCode}>
              Sign Up
            </button>

            <p className="auth-muted">
              Already have an account? <a href="/auth/login">Log In</a>
            </p>
          </>
        ) : (
          <>
            <h1 className="auth-title">Verify your email</h1>
            <p className="auth-muted">Enter the code we sent to {email}.</p>
            <a className="auth-button" href={`/auth/verify?email=${email}`}>
              Enter Code
            </a>
          </>
        )}
      </div>
    </div>
  );
}
