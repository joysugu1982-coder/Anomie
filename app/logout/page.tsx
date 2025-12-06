// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function LogoutPage() {
//   const router = useRouter();
//   useEffect(() => {
//     localStorage.removeItem("customer_token");
//     router.replace("/");
//   }, []);
//   return null;
// }


"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("customer_token");
    router.push("/");
  }, []);

  return <p>Logging out...</p>;
}
