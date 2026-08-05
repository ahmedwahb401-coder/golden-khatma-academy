import { createClient } from "@/lib/supabase/server";
import PaymentsTable, { type PaymentRow } from "@/components/admin/PaymentsTable";

export default async function AdminPaymentsPage() {
  const supabase = await createClient();

  const [{ data: payments, error }, { data: students }] = await Promise.all([
    supabase
      .from("payments")
      .select("id, amount, month, status, student_id, students(full_name)")
      .order("month", { ascending: false }),
    supabase.from("students").select("id, full_name").order("full_name"),
  ]);

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-display">المدفوعات</h1>
        <p className="text-sm opacity-60 mt-1">{(payments || []).length} سجل دفعة</p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600 mb-5">
          تعذّر تحميل بيانات المدفوعات. تأكد من ضبط متغيرات Supabase في .env.local.
        </div>
      )}

      <PaymentsTable
        payments={(payments as unknown as PaymentRow[]) || []}
        students={students || []}
      />
    </div>
  );
}
