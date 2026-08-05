import type { MetadataRoute } from "next";

// عدّل هذا الرابط ليطابق نطاقك الفعلي بعد النشر
const BASE_URL = "https://khatma-academy.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/men", "/women", "/about", "/teachers", "/teachers/women", "/contact", "/register"];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
