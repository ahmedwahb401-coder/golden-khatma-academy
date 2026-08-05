// Service Worker بسيط لأكاديمية الختمة الذهبية.
// يعتمد استراتيجية "الشبكة أولاً" مع الرجوع للكاش عند انقطاع الاتصال —
// مناسب لمحتوى يتغيّر باستمرار (بيانات Supabase) مع دعم أساسي للعمل بدون إنترنت.

const CACHE_NAME = "khatma-academy-v1";
const OFFLINE_URLS = ["/", "/men", "/women", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // لا نتدخل في طلبات API/Supabase أو الطلبات غير GET
  if (event.request.method !== "GET" || event.request.url.includes("supabase.co")) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
