import RubElHizb from "./RubElHizb";
import { memorizationPrograms, revisionPrograms } from "@/lib/data";

type Program = {
  duration: string;
  pace: string;
  price: string;
  featured?: boolean;
};

export function ProgramCard({ program }: { program: Program }) {
  return (
    <div
      className={`relative rounded-2xl p-6 flex flex-col gap-3 border transition-all duration-300 hover:-translate-y-1 ${
        program.featured
          ? "bg-gradient-to-b from-primary to-primary-dark text-white border-transparent shadow-xl shadow-emerald-900/20"
          : "bg-white/80 dark:bg-white/[0.04] border-black/5 dark:border-white/10 shadow-sm"
      }`}
    >
      {program.featured && (
        <span className="absolute -top-3 right-6 text-[11px] font-bold px-3 py-1 rounded-full bg-secondary text-[#1F2A24]">
          الأكثر اختياراً
        </span>
      )}

      <div className="text-lg font-bold font-display">
        {program.duration}
      </div>

      <div
        className={`text-sm ${
          program.featured ? "text-emerald-50/80" : "opacity-70"
        }`}
      >
        {program.pace}
      </div>

      {/* رسالة بدلاً من السعر */}
      <div className="mt-3 text-center py-4 rounded-xl bg-black/5 dark:bg-white/5">
        <p
          className={`text-lg font-bold ${
            program.featured ? "text-white" : "text-primary"
          }`}
        >
          تواصل معنا
        </p>

        <p
          className={`text-sm mt-1 ${
            program.featured ? "text-emerald-50/90" : "text-gray-600"
          }`}
        >
          لمعرفة تفاصيل الاشتراك
        </p>

        <p
          className={`text-xs mt-2 leading-6 ${
            program.featured ? "text-emerald-100/80" : "text-gray-500"
          }`}
        >
          وسنساعدك في اختيار البرنامج الأنسب لك.
        </p>
      </div>

      <button
        className={`mt-3 rounded-xl py-2.5 text-sm font-bold transition-colors ${
          program.featured
            ? "bg-white text-primary hover:bg-emerald-50"
            : "bg-primary text-white hover:bg-primary-dark"
        }`}
      >
        اشترك الآن
      </button>
    </div>
  );
}

export default function Programs() {
  return (
    <section id="programs" className="max-w-6xl mx-auto px-5 py-24">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
          برامجنا
        </h2>
        <p className="opacity-70">
          اختر المسار الذي يناسب هدفك: حفظ جديد، مراجعة وتثبيت، أو تجويد.
        </p>
      </div>

      <h3 className="font-bold text-xl mb-5 flex items-center gap-2">
        <RubElHizb className="w-4 h-4 text-secondary" />
        برامج الحفظ
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        {memorizationPrograms.map((p) => (
          <ProgramCard key={p.duration} program={p} />
        ))}
      </div>

      <h3 className="font-bold text-xl mb-5 flex items-center gap-2">
        <RubElHizb className="w-4 h-4 text-secondary" />
        برامج المراجعة
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        {revisionPrograms.map((p) => (
          <ProgramCard key={p.duration} program={p} />
        ))}
      </div>

      <div className="rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 border border-secondary/25 bg-secondary/5">
        <div className="flex-1">
          <h3 className="font-bold text-xl mb-2 font-display">
            برنامج التجويد
          </h3>

          <p className="opacity-75 leading-relaxed">
            تعلّم أحكام التجويد نظرياً، مع تطبيق عملي وتصحيح مباشر من محفّظين
            متخصصين حتى تتقن التلاوة الصحيحة.
          </p>
        </div>

        <button className="shrink-0 rounded-xl px-7 py-3.5 font-bold text-white transition hover:opacity-90 bg-primary">
          اعرف التفاصيل
        </button>
      </div>
    </section>
  );
}