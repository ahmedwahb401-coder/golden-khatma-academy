import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "التسجيل | أكاديمية الختمة الذهبية",
  description: "سجّل بياناتك الآن وابدأ رحلتك في حفظ القرآن الكريم مع أكاديمية الختمة الذهبية.",
};

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <section className="max-w-2xl mx-auto px-5 py-20">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 font-display">سجّل الآن</h1>
          <p className="opacity-70">إملأ البيانات التالية وسيتواصل معك فريقنا خلال 24 ساعة.</p>
        </div>
        <RegisterForm />
      </section>
      <Footer />
    </>
  );
}
