import {
  Mail,
  MessageCircle,
  Phone,
  Send,
  Globe,
  Share2,
} from "lucide-react";
import RubElHizb from "./RubElHizb";

export default function Footer() {
  return (
    <footer className="border-t mt-10 border-black/10 dark:border-white/10 bg-primary/5">
      <div className="max-w-6xl mx-auto px-5 py-12 grid sm:grid-cols-3 gap-8">
        {/* معلومات الأكاديمية */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-primary">
              <RubElHizb className="w-4 h-4" />
            </div>
            <span className="font-bold font-display">
              أكاديمية الختمة الذهبية
            </span>
          </div>

          <p className="text-sm opacity-60 leading-relaxed">
            منصة تعليمية لتحفيظ القرآن الكريم أونلاين، تجمع بين الأصالة
            والاحترافية.
          </p>
        </div>

        {/* بيانات التواصل */}
        <div>
          <h4 className="font-bold mb-3 text-sm">تواصل معنا</h4>

          <ul className="flex flex-col gap-2 text-sm opacity-70">
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              ٠١٠٠ ٠٠٠ ٠٠٠٠
            </li>

            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              info@khatma-academy.com
            </li>
          </ul>
        </div>

        {/* السوشيال */}
        <div>
          <h4 className="font-bold mb-3 text-sm">تابعنا</h4>

          <div className="flex gap-2">
            {[MessageCircle, Globe, Share2, Send].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-black/10 dark:border-white/20 transition hover:-translate-y-0.5"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-xs opacity-50 pb-6">
        © 2026 أكاديمية الختمة الذهبية. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}