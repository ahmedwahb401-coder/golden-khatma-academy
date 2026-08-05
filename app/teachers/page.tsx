import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PublicTeacherGrid from "@/components/PublicTeacherGrid";

export const metadata: Metadata = {
  title: "المحفّظون | أكاديمية الختمة الذهبية",
  description: "تعرّف على نخبة المحفّظين المتخصصين في أكاديمية الختمة الذهبية.",
};

export default function TeachersPage() {
  return (
    <>
      <Navbar />
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold mb-3 font-display">محفّظونا</h1>
          <p className="opacity-70">نخبة من أهل الإجازة، بخبرة تمتد لسنوات في تحفيظ القرآن الكريم.</p>
        </div>
        <PublicTeacherGrid gender="male" />
      </section>
      <Footer />
    </>
  );
}
