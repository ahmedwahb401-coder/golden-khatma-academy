"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // فشل التسجيل لا يعطّل الموقع — تجاهل بصمت
      });
    }
  }, []);

  return null;
}
