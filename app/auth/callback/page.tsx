// "use client";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function CallbackPage() {
//   const params = useSearchParams();
//   const router = useRouter();

//   useEffect(() => {
//     const token = params.get("access_token");
//     if (token) {
//       localStorage.setItem("customer_token", token);
//       router.replace("/");
//     }
//   }, []);

//   return <p>Verifying account...</p>;
// }


"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CallbackPage() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = params.get("customer_access_token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    // Save token
    localStorage.setItem("customer_token", token);

    // Redirect to profile
    router.push("/profile");
  }, []);

  return (
    <div className="auth-wrapper">
      <div className="auth-card">Signing you in...</div>
    </div>
  );
}

