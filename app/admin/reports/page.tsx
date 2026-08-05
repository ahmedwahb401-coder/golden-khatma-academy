import { createClient } from "@/lib/supabase/server";
import ReportGenerator from "@/components/admin/ReportGenerator";

export default async function AdminReportsPage() {
  const supabase = await createClient();
  const { data: students } = await supabase.from("students").select("id, full_name").order("full_name");

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-display">التقارير</h1>
        <p className="text-sm opacity-60 mt-1">تقرير PDF فوري لأي طالب بالحضور والتسميع والمدفوعات</p>
      </div>
      <ReportGenerator students={students || []} />
    </div>
  );
}
