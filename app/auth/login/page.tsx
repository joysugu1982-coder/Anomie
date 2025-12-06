// "use client";

// export default function LoginPage() {
//   const SHOP_URL = "https://anomiesd.myshopify.com";

//   const loginUrl = `${SHOP_URL}/account/login?return_url=${encodeURIComponent(
//     "http://localhost:3000/auth/callback"
//   )}`;

//   return (
//     <div className="auth-screen">
//       <h1>Log into your account</h1>

//       <button onClick={() => (window.location.href = loginUrl)}>
//         Continue with Email
//       </button>
//     </div>
//   );
// }


"use client";

export default function LoginPage() {
  const shopUrl = process.env.NEXT_PUBLIC_SHOP_URL!;
  const returnUrl = process.env.NEXT_PUBLIC_RETURN_URL!;

  const loginUrl = `${shopUrl}/account/login?return_url=${encodeURIComponent(returnUrl)}`;

  const handleLogin = () => {
    window.location.href = loginUrl;
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Sign In</h1>

        <button className="auth-button" onClick={handleLogin}>
          Continue with Email
        </button>
      </div>
    </div>
  );
}

