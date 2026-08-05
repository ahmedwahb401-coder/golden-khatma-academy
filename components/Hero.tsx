import Link from "next/link";
import RubElHizb from "./RubElHizb";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* حقل زخرفي هادئ من علامة ربع الحزب، بطيء الدوران */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-[520px] h-[520px] animate-spin-slow text-primary">
          <RubElHizb className="w-full h-full" opacity={0.08} />
        </div>
        <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] animate-spin-slow-reverse text-secondary">
          <RubElHizb className="w-full h-full" opacity={0.1} />
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-5 pt-20 pb-24 text-center flex flex-col items-center">
        <span className="inline-flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full mb-6 bg-secondary/10 text-[#8a6a1a] dark:text-[#F2D98A]">
          <RubElHizb className="w-3.5 h-3.5" /> رحلة الحفظ تبدأ بخطوة
        </span>

        <h1 className="text-4xl md:text-6xl font-bold leading-[1.25] mb-6 font-display">
          أكاديمية <span className="text-primary">الختمة الذهبية</span>
          <br />
          <span className="text-2xl md:text-3xl font-normal opacity-80">
            رحلة متكاملة لحفظ القرآن الكريم أونلاين
          </span>
        </h1>

        <p className="max-w-xl text-base md:text-lg opacity-75 mb-10 leading-relaxed">
          ابدأ رحلتك مع كتاب الله مع نخبة من المحفظين والمحفظات المتخصصين، وبرامج تناسب جميع
          الأعمار والمستويات.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <Link
            href="/men"
            className="w-64 sm:w-auto rounded-2xl px-8 py-4 font-bold text-white shadow-lg shadow-emerald-900/20 transition hover:-translate-y-0.5 bg-primary"
          >
            👳 قسم الرجال
          </Link>
          <Link
            href="/women"
            className="w-64 sm:w-auto rounded-2xl px-8 py-4 font-bold shadow-lg transition hover:-translate-y-0.5 border-2 border-secondary text-[#8a6a1a] dark:text-[#F2D98A]"
          >
            🧕 قسم النساء
          </Link>
        </div>

        <Link
          href="/register"
          className="text-sm font-bold underline underline-offset-4 decoration-2 decoration-secondary"
        >
          ابدأ / ابدئي التسجيل الآن
        </Link>
      </div>
    </section>
  );
}
