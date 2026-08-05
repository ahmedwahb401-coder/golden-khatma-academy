import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// عميل Supabase يعمل على السيرفر (Server Components / Server Actions / Route Handlers).
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options?: {
              path?: string;
              maxAge?: number;
              expires?: Date;
              httpOnly?: boolean;
              secure?: boolean;
              sameSite?: boolean | "lax" | "strict" | "none";
            };
          }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // يمكن تجاهل هذا الخطأ إذا تم استدعاء setAll من Server Component
          }
        },
      },
    }
  );
}
