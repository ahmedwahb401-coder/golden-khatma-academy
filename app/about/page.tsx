import type { Metadata } from "next";
import { Eye, Target, Flag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RubElHizb from "@/components/RubElHizb";

export const metadata: Metadata = {
  title: "من نحن | أكاديمية الختمة الذهبية",
  description: "تعرّف على رؤية ورسالة وأهداف أكاديمية الختمة الذهبية لتحفيظ القرآن الكريم أونلاين.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden border-b border-black/10 dark:border-white/10">
        <div className="absolute -top-20 -right-20 w-[380px] h-[380px] animate-spin-slow text-primary pointer-events-none">
          <RubElHizb className="w-full h-full" opacity={0.07} />
        </div>
        <div className="relative max-w-3xl mx-auto px-5 pt-20 pb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display">
            من <span className="text-primary">نحن</span>
          </h1>
          <p className="opacity-75 leading-relaxed text-lg">
            أكاديمية الختمة الذهبية منصة تعليمية متخصصة في تحفيظ ومراجعة وتجويد القرآن الكريم
            أونلاين، تجمع طلاباً وطالبات من مختلف الأعمار والمستويات مع نخبة من المحفّظين
            والمحفّظات المتخصصين، عبر حلقات مباشرة ومتابعة يومية دقيقة، لتيسير رحلة حفظ كتاب الله
            من أي مكان في العالم.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 py-20 grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-7">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-primary/10">
            <Eye className="w-5 h-5 text-primary" strokeWidth={1.75} />
          </div>
          <h3 className="font-bold text-lg mb-2 font-display">رؤيتنا</h3>
          <p className="text-sm opacity-70 leading-relaxed">
            أن نكون المنصة الأولى الموثوقة عالمياً لتحفيظ القرآن الكريم أونلاين، ونصل بخدماتنا إلى
            كل بيت يرغب في تربية أبنائه على كتاب الله، أياً كان مكانه.
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-7">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-primary/10">
            <Target className="w-5 h-5 text-primary" strokeWidth={1.75} />
          </div>
          <h3 className="font-bold text-lg mb-2 font-display">رسالتنا</h3>
          <p className="text-sm opacity-70 leading-relaxed">
            تقديم تعليم قرآني عالي الجودة، بمنهجية واضحة ومتابعة فردية، يجمع بين أصالة التلقي
            التقليدي ومرونة التعلّم عن بُعد، بأيدي محفّظين ومحفّظات ذوي إجازة وخبرة.
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-7">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-primary/10">
            <Flag className="w-5 h-5 text-primary" strokeWidth={1.75} />
          </div>
          <h3 className="font-bold text-lg mb-2 font-display">أهدافنا</h3>
          <ul className="text-sm opacity-70 leading-relaxed list-disc pr-4 space-y-1">
            <li>تمكين كل طالب وطالبة من إتمام ختمة كاملة بإتقان.</li>
            <li>رفع مستوى التلاوة الصحيحة وفق أحكام التجويد.</li>
            <li>توفير متابعة دورية شفافة لأولياء الأمور.</li>
            <li>الوصول لطلاب في أكثر من 20 دولة حول العالم.</li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
