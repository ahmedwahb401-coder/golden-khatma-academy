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

          <ul className="flex flex-col gap-3 text-sm opacity-80">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <a
                href="tel:01095767861"
                dir="ltr"
                className="hover:text-primary transition"
              >
                01095767861
              </a>
            </li>

            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <a
                href="mailto:info@khatma-academy.com"
                className="hover:text-primary transition"
              >
                info@khatma-academy.com
              </a>
            </li>
          </ul>
        </div>

        {/* وسائل التواصل */}
        <div>
          <h4 className="font-bold mb-3 text-sm">تابعنا</h4>

          <div className="flex gap-2">
            {/* واتساب */}
            <a
              href="https://wa.me/201095767861"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-black/10 dark:border-white/20 transition hover:-translate-y-1 hover:bg-green-500 hover:text-white"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            {/* الموقع */}
            <a
              href="#"
              aria-label="Website"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-black/10 dark:border-white/20 transition hover:-translate-y-1 hover:bg-primary hover:text-white"
            >
              <Globe className="w-5 h-5" />
            </a>

            {/* مشاركة */}
            <a
              href="#"
              aria-label="Share"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-black/10 dark:border-white/20 transition hover:-translate-y-1 hover:bg-primary hover:text-white"
            >
              <Share2 className="w-5 h-5" />
            </a>

            {/* تيليجرام */}
            <a
              href="#"
              aria-label="Telegram"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-black/10 dark:border-white/20 transition hover:-translate-y-1 hover:bg-sky-500 hover:text-white"
            >
              <Send className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs opacity-50 pb-6">
        © 2026 أكاديمية الختمة الذهبية. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}