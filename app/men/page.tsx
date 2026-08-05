import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RubElHizb from "@/components/RubElHizb";
import TeacherCard from "@/components/TeacherCard";
import { ProgramCard } from "@/components/Programs";
import { memorizationPrograms, revisionPrograms, menTeachers } from "@/lib/data";

export const metadata: Metadata = {
  title: "قسم الرجال | أكاديمية الختمة الذهبية",
  description: "إشراف محفّظين متخصصين لتحفيظ ومراجعة القرآن الكريم للرجال والشباب أونلاين.",
};

export default function MenSectionPage() {
  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden border-b border-black/10 dark:border-white/10">
        <div className="absolute -top-20 -left-20 w-[420px] h-[420px] animate-spin-slow text-primary pointer-events-none">
          <RubElHizb className="w-full h-full" opacity={0.07} />
        </div>
        <div className="relative max-w-4xl mx-auto px-5 pt-20 pb-20 text-center flex flex-col items-center">
          <span className="text-4xl mb-4">👳</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            قسم <span className="text-primary">الرجال</span>
          </h1>
          <p className="max-w-lg opacity-75 leading-relaxed mb-9">
            إشراف محفّظين متخصصين، بخطة متابعة يومية دقيقة ومسار واضح من أول حرف حتى ختم القرآن
            كاملاً.
          </p>
          <Link
            href="/register"
            className="rounded-2xl px-8 py-4 font-bold text-white shadow-lg shadow-emerald-900/20 transition hover:-translate-y-0.5 bg-primary"
          >
            ابدأ التسجيل الآن
          </Link>
        </div>
      </section>

      <section id="teachers" className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 font-display">محفّظونا</h2>
          <p className="opacity-70">نخبة من أهل الإجازة، بخبرة تمتد لسنوات في تحفيظ الرجال والشباب.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {menTeachers.map((t) => (
            <TeacherCard key={t.name} {...t} />
          ))}
        </div>
      </section>

      <section id="programs" className="max-w-6xl mx-auto px-5 py-20">
        <h3 className="font-bold text-xl mb-5 flex items-center gap-2">
          <RubElHizb className="w-4 h-4 text-secondary" /> برامج الحفظ
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {memorizationPrograms.map((p) => (
            <ProgramCard key={p.duration} program={p} />
          ))}
        </div>
        <h3 className="font-bold text-xl mb-5 flex items-center gap-2">
          <RubElHizb className="w-4 h-4 text-secondary" /> برامج المراجعة
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {revisionPrograms.map((p) => (
            <ProgramCard key={p.duration} program={p} />
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 pb-24">
        <div className="rounded-3xl p-10 text-center border border-secondary/25 bg-secondary/5 flex flex-col items-center gap-4">
          <CheckCircle2 className="w-8 h-8 text-primary" />
          <h3 className="text-2xl font-bold font-display">جاهز تبدأ؟</h3>
          <p className="opacity-70 max-w-sm">
            إملأ نموذج التسجيل وهيتواصل معاك فريقنا خلال 24 ساعة لتحديد المستوى والموعد المناسب.
          </p>
          <Link
            href="/register"
            className="rounded-xl px-8 py-3.5 font-bold text-white transition hover:opacity-90 bg-primary"
          >
            سجّل بياناتك
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
