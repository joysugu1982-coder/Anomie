"use client"

import { useEffect, useRef } from "react"

export default function KlaviyoForm() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // If the Klaviyo embed script is included elsewhere, it may look for
    // the placeholder element by class name. We render the placeholder here
    // on the client only to avoid hydration mismatches.
    // Optionally, you can load Klaviyo's embed script here if needed.
    return () => {}
  }, [])

  return <div ref={ref} className="klaviyo-form-QTNCzA"></div>
}
