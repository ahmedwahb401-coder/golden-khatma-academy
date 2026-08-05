"use client";

import { useState } from "react";
import { Mic, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function HomeworkUpload({
  studentId,
  courseId,
}: {
  studentId: string;
  courseId: string | null;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setStatus("loading");

    const supabase = createClient();
    const path = `${studentId}/${Date.now()}-${file.name}`;

    // يتطلب إنشاء bucket باسم "homework" من Supabase Storage (Public أو بصلاحيات محدّدة)
    const { error: uploadError } = await supabase.storage.from("homework").upload(path, file);
    if (uploadError) {
      setStatus("error");
      return;
    }

    const { data: publicUrl } = supabase.storage.from("homework").getPublicUrl(path);

    const { error: insertError } = await supabase.from("homework_submissions").insert([
      {
        student_id: studentId,
        course_id: courseId,
        audio_url: publicUrl.publicUrl,
        note,
      },
    ]);

    if (insertError) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setFile(null);
    setNote("");
  }

  return (
    <form
      onSubmit={handleUpload}
      className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Mic className="w-5 h-5 text-primary" />
        <h3 className="font-bold">رفع واجب صوتي</h3>
      </div>

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full text-sm mb-3"
      />
      <textarea
        placeholder="ملاحظة (اختياري)، مثال: تسميع سورة البقرة من آية 1 إلى 20"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
        className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-primary transition mb-3"
      />

      {status === "success" && (
        <p className="text-sm text-emerald-600 mb-3">تم رفع الواجب بنجاح، هيراجعه المحفّظ قريباً.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600 mb-3">
          حدث خطأ أثناء الرفع. تأكد من إنشاء bucket باسم "homework" في Supabase Storage.
        </p>
      )}

      <button
        type="submit"
        disabled={!file || status === "loading"}
        className="flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50 bg-primary"
      >
        <Upload className="w-4 h-4" /> {status === "loading" ? "جاري الرفع..." : "رفع الواجب"}
      </button>
    </form>
  );
}
