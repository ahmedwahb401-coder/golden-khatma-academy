import type { Metadata } from "next";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "تواصل معنا | أكاديمية الختمة الذهبية",
  description: "تواصل مع فريق أكاديمية الختمة الذهبية عبر الواتساب أو الهاتف أو البريد الإلكتروني.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <section className="max-w-5xl mx-auto px-5 py-20">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold mb-3 font-display">تواصل معنا</h1>
          <p className="opacity-70">إحنا هنا عشان نساعدك، تواصل معنا بأي وسيلة تناسبك.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 flex flex-col gap-4">
              <a href="https://wa.me/201000000000" className="flex items-center gap-3 text-sm">
                <MessageCircle className="w-5 h-5 text-primary" /> واتساب: ٠١٠٠ ٠٠٠ ٠٠٠٠
              </a>
              <a href="tel:+201000000000" className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-primary" /> هاتف: ٠١٠٠ ٠٠٠ ٠٠٠٠
              </a>
              <a href="mailto:info@khatma-academy.com" className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-primary" /> info@khatma-academy.com
              </a>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-5 h-5 text-primary" /> القاهرة، مصر (خدمة أونلاين لكل الدول)
              </div>
            </div>

            {/* استبدل src بخريطة موقعك الفعلي من Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 aspect-video">
              <iframe
                title="موقعنا على الخريطة"
                className="w-full h-full"
                loading="lazy"
                src="https://www.google.com/maps?q=Cairo,Egypt&output=embed"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6">
            <h3 className="font-bold mb-4">راسلنا</h3>
            <ContactForm />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
