"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getOrCreateId(storage: Storage, key: string): string {
  try {
    let val = storage.getItem(key);
    if (!val) {
      val = "v_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      storage.setItem(key, val);
    }
    return val;
  } catch {
    return "v_" + Math.random().toString(36).substring(2, 15);
  }
}

export function LiveTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const visitorId = getOrCreateId(localStorage, "sf_visitor");
    const sessionId = getOrCreateId(sessionStorage, "sf_session");

    const trackCurrentPage = () => {
      const payload = {
        session_id: sessionId,
        visitor_id: visitorId,
        path: window.location.pathname,
        referrer: document.referrer || null,
        device_type: window.innerWidth < 768 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop",
        browser: "Chrome",
        os: "Windows",
      };

      try {
        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {});
      } catch (err) {}
    };

    if (lastTracked.current !== pathname) {
      lastTracked.current = pathname;
      trackCurrentPage();
    }

    // Heartbeat every 45s to maintain active "Visitors Right Now" in Admin Live View
    const interval = setInterval(trackCurrentPage, 45000);
    return () => clearInterval(interval);
  }, [pathname]);

  return null;
}
