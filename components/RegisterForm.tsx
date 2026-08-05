"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, type RegistrationInput } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/client";

const inputClass =
  "w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-4 py-2.5 text-sm focus:border-primary outline-none transition";
const labelClass = "text-sm font-bold mb-1.5 block";
const errorClass = "text-xs text-red-600 mt-1";

export default function RegisterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
  });

  async function onSubmit(data: RegistrationInput) {
    setStatus("loading");
    const supabase = createClient();

    // يُدرج الطلب في جدول "students" على Supabase. راجع lib/supabase/schema.sql
    const { error } = await supabase.from("students").insert([
      {
        full_name: data.full_name,
        age: data.age,
        country: data.country,
        city: data.city,
        phone: data.phone,
        whatsapp: data.whatsapp,
        email: data.email,
        gender: data.gender,
        program: data.program,
        level: data.level,
        memorized_parts: data.memorized_parts,
        preferred_time: data.preferred_time,
      },
    ]);

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }

    setStatus("success");
    reset();
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
        <h3 className="font-bold text-lg mb-2">تم إرسال طلبك بنجاح 🎉</h3>
        <p className="opacity-70 text-sm">
          هيتواصل معاك فريقنا خلال 24 ساعة لتحديد المستوى والموعد المناسب.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-5">
      <div>
        <label className={labelClass}>الاسم بالكامل</label>
        <input className={inputClass} {...register("full_name")} />
        {errors.full_name && <p className={errorClass}>{errors.full_name.message}</p>}
      </div>

      <div>
        <label className={labelClass}>العمر</label>
        <input type="number" className={inputClass} {...register("age")} />
        {errors.age && <p className={errorClass}>{errors.age.message}</p>}
      </div>

      <div>
        <label className={labelClass}>الدولة</label>
        <input className={inputClass} {...register("country")} />
        {errors.country && <p className={errorClass}>{errors.country.message}</p>}
      </div>

      <div>
        <label className={labelClass}>المدينة</label>
        <input className={inputClass} {...register("city")} />
        {errors.city && <p className={errorClass}>{errors.city.message}</p>}
      </div>

      <div>
        <label className={labelClass}>رقم الهاتف</label>
        <input className={inputClass} {...register("phone")} />
        {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
      </div>

      <div>
        <label className={labelClass}>رقم الواتساب</label>
        <input className={inputClass} {...register("whatsapp")} />
        {errors.whatsapp && <p className={errorClass}>{errors.whatsapp.message}</p>}
      </div>

      <div className="sm:col-span-2">
        <label className={labelClass}>البريد الإلكتروني</label>
        <input type="email" className={inputClass} {...register("email")} />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div>
        <label className={labelClass}>الجنس</label>
        <select className={inputClass} {...register("gender")}>
          <option value="">اختر</option>
          <option value="male">رجل</option>
          <option value="female">امرأة</option>
        </select>
        {errors.gender && <p className={errorClass}>{errors.gender.message}</p>}
      </div>

      <div>
        <label className={labelClass}>البرنامج</label>
        <select className={inputClass} {...register("program")}>
          <option value="">اختر</option>
          <option value="memorization">حفظ</option>
          <option value="revision">مراجعة</option>
          <option value="tajweed">تجويد</option>
        </select>
        {errors.program && <p className={errorClass}>{errors.program.message}</p>}
      </div>

      <div>
        <label className={labelClass}>المستوى</label>
        <select className={inputClass} {...register("level")}>
          <option value="">اختر</option>
          <option value="beginner">مبتدئ</option>
          <option value="intermediate">متوسط</option>
          <option value="advanced">متقدم</option>
        </select>
        {errors.level && <p className={errorClass}>{errors.level.message}</p>}
      </div>

      <div>
        <label className={labelClass}>عدد الأجزاء المحفوظة</label>
        <input type="number" className={inputClass} {...register("memorized_parts")} />
        {errors.memorized_parts && <p className={errorClass}>{errors.memorized_parts.message}</p>}
      </div>

      <div className="sm:col-span-2">
        <label className={labelClass}>الموعد المناسب</label>
        <select className={inputClass} {...register("preferred_time")}>
          <option value="">اختر</option>
          <option value="morning">صباحاً</option>
          <option value="afternoon">عصراً</option>
          <option value="evening">مساءً</option>
        </select>
        {errors.preferred_time && <p className={errorClass}>{errors.preferred_time.message}</p>}
      </div>

      {status === "error" && (
        <p className="sm:col-span-2 text-sm text-red-600">
          حدث خطأ أثناء إرسال الطلب، من فضلك حاول مرة أخرى.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="sm:col-span-2 rounded-xl py-3.5 font-bold text-white transition hover:opacity-90 disabled:opacity-60 bg-primary"
      >
        {status === "loading" ? "جاري الإرسال..." : "إرسال الطلب"}
      </button>
    </form>
  );
}
