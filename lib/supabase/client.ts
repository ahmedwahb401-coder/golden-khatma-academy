import { createBrowserClient } from "@supabase/ssr";

// عميل Supabase يعمل على المتصفح (Client Components).
// تأكد من إضافة القيم في ملف .env.local (راجع .env.local.example).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
