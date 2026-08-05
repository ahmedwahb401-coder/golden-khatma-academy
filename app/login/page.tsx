import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import RubElHizb from "@/components/RubElHizb";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "تسجيل الدخول | أكاديمية الختمة الذهبية",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const params = await searchParams;
  const redirectTo = params.redirect || "/dashboard";

  return (
    <>
      <Navbar />
      <section className="max-w-md mx-auto px-5 py-24">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-primary mb-4">
            <RubElHizb className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold font-display mb-2">تسجيل الدخول</h1>
          <p className="opacity-70 text-sm">
            للطلاب والمحفّظين والإدارة — استخدم بيانات الحساب اللي اتبعتلك بعد التسجيل.
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 bg-white/70 dark:bg-white/5">
          <LoginForm redirectTo={redirectTo} />
        </div>

        <p className="text-center text-sm opacity-70 mt-6">
          لسه معملتش حساب؟{" "}
          <Link href="/register" className="font-bold text-primary">
            سجّل بياناتك من هنا
          </Link>
        </p>
      </section>
    </>
  );
}
