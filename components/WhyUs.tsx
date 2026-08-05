import { BookOpen, CheckCircle2, Clock, MessageCircle, Users } from "lucide-react";
import { whyUs } from "@/lib/data";

const icons = [Users, BookOpen, CheckCircle2, Clock, MessageCircle, Clock];

export default function WhyUs() {
  return (
    <section id="why" className="max-w-6xl mx-auto px-5 py-24">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
          لماذا <span className="text-primary">أكاديمية الختمة الذهبية</span>؟
        </h2>
        <p className="opacity-70 max-w-lg mx-auto">
          تجربة تحفيظ مصمّمة حول احتياج كل طالب وطالبة، لا حلقة عامة تناسب الجميع.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {whyUs.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div
              key={item.title}
              className="rounded-2xl p-6 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm transition hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-primary/10">
                <Icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
              </div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm opacity-70 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
