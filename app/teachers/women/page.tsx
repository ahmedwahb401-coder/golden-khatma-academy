import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PublicTeacherGrid from "@/components/PublicTeacherGrid";

export const metadata: Metadata = {
  title: "المحفّظات | أكاديمية الختمة الذهبية",
  description: "تعرّفي على نخبة المحفّظات المتخصصات في أكاديمية الختمة الذهبية.",
};

export default function WomenTeachersPage() {
  return (
    <>
      <Navbar />
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold mb-3 font-display">محفّظاتنا</h1>
          <p className="opacity-70">نخبة من المحفّظات المعتمدات، بخبرة طويلة في تحفيظ النساء والفتيات.</p>
        </div>
        <PublicTeacherGrid gender="female" />
      </section>
      <Footer />
    </>
  );
}
