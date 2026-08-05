-- =============================================================
-- قاعدة بيانات أكاديمية الختمة الذهبية — Supabase (Postgres)
-- نفّذ هذا الملف من SQL Editor في لوحة تحكم Supabase.
-- =============================================================

-- المستخدمون (تُدار المصادقة تلقائياً بواسطة Supabase Auth في auth.users،
-- وهذا الجدول يخزّن بيانات إضافية ودور كل مستخدم في النظام)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('admin', 'teacher', 'student')),
  gender text check (gender in ('male', 'female')),
  created_at timestamptz default now()
);

-- الطلاب/الطالبات (تُنشأ سجلاتهم الأولية من نموذج التسجيل العام،
-- قبل حتى إنشاء حساب دخول لهم)
create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  full_name text not null,
  age int not null,
  country text not null,
  city text not null,
  phone text not null,
  whatsapp text not null,
  email text not null,
  gender text not null check (gender in ('male', 'female')),
  program text not null check (program in ('memorization', 'revision', 'tajweed')),
  level text not null check (level in ('beginner', 'intermediate', 'advanced')),
  memorized_parts int default 0,
  preferred_time text not null check (preferred_time in ('morning', 'afternoon', 'evening')),
  teacher_id uuid references public.users(id) on delete set null,
  status text not null default 'pending' check (status in ('pending', 'active', 'paused', 'completed')),
  created_at timestamptz default now()
);

-- المحفّظون والمحفّظات
create table if not exists public.teachers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  full_name text not null,
  gender text not null check (gender in ('male', 'female')),
  ijazah text, -- الإجازة
  specialty text,
  years_experience int default 0,
  bio text,
  photo_url text,
  created_at timestamptz default now()
);

-- البرامج المعروضة (حفظ / مراجعة / تجويد) بأسعارها ومددها
create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('memorization', 'revision', 'tajweed')),
  duration_label text not null, -- مثال: "6 أشهر"
  pace_label text not null,     -- مثال: "5 صفحات يومياً"
  price numeric not null,
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- الكورسات الفعلية (ربط طالب ببرنامج ومحفّظ ومواعيد)
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.students(id) on delete cascade,
  teacher_id uuid references public.teachers(id) on delete set null,
  program_id uuid references public.programs(id) on delete set null,
  start_date date,
  status text not null default 'active' check (status in ('active', 'paused', 'completed')),
  created_at timestamptz default now()
);

-- الحضور والغياب
create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade,
  session_date date not null,
  status text not null check (status in ('present', 'absent', 'excused')),
  notes text,
  created_at timestamptz default now()
);

-- تسجيل التسميع (الحفظ)
create table if not exists public.memorization (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade,
  session_date date not null,
  surah text,
  from_ayah int,
  to_ayah int,
  grade numeric,
  notes text,
  created_at timestamptz default now()
);

-- متابعة المراجعة
create table if not exists public.revision (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade,
  session_date date not null,
  part_label text,
  grade numeric,
  notes text,
  created_at timestamptz default now()
);

-- المدفوعات والاشتراكات
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.students(id) on delete cascade,
  amount numeric not null,
  month date not null,
  status text not null default 'unpaid' check (status in ('paid', 'unpaid')),
  paid_at timestamptz,
  created_at timestamptz default now()
);

-- الإشعارات (واتساب / إيميل)
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.students(id) on delete cascade,
  channel text not null check (channel in ('whatsapp', 'email')),
  message text not null,
  sent_at timestamptz default now()
);

-- التقارير (روابط PDF مُنشأة)
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.students(id) on delete cascade,
  period_label text not null,
  file_url text,
  created_at timestamptz default now()
);

-- رسائل نموذج "تواصل معنا" العام
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz default now()
);

-- الواجبات الصوتية: يرفعها الطالب من لوحته، ويراجعها المحفّظ
create table if not exists public.homework_submissions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.students(id) on delete cascade,
  course_id uuid references public.courses(id) on delete set null,
  audio_url text not null,
  note text,
  status text not null default 'pending' check (status in ('pending', 'reviewed')),
  teacher_feedback text,
  created_at timestamptz default now()
);

-- إعدادات الموقع العامة (مفتاح/قيمة)
create table if not exists public.settings (
  key text primary key,
  value jsonb not null
);

-- =============================================================
-- Row Level Security (تفعيل أساسي — يُنصح بمراجعته وتخصيصه لاحقاً)
-- =============================================================
alter table public.students enable row level security;

-- السماح بإدخال طلب تسجيل جديد من الموقع العام (أي زائر)
create policy "Anyone can submit a registration"
  on public.students for insert
  with check (true);

-- دالة مساعدة: هل المستخدم الحالي أدمن؟
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- الأدمن فقط يقدر يشوف كل الطلاب
create policy "Admins can view all students"
  on public.students for select
  using (public.is_admin());

-- الأدمن فقط يقدر يعدّل حالة الطالب
create policy "Admins can update students"
  on public.students for update
  using (public.is_admin());

-- لاحقاً: أضف policies خاصة بالقراءة/التعديل حسب دور المستخدم
-- (admin يرى الكل، teacher يرى طلابه فقط، student يرى بياناته فقط).

-- المستخدمون: كل مستخدم يقرأ بياناته فقط، والأدمن يقرأ الكل
alter table public.users enable row level security;

create policy "Users can view own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Admins can view all users"
  on public.users for select
  using (public.is_admin());

-- المدفوعات: الأدمن فقط (تُستخدم في حساب الإيرادات بلوحة الإدارة)
alter table public.payments enable row level security;

create policy "Admins can view payments"
  on public.payments for select
  using (public.is_admin());

create policy "Admins can insert payments"
  on public.payments for insert
  with check (public.is_admin());

create policy "Admins can update payments"
  on public.payments for update
  using (public.is_admin());

-- المحفّظون: يظهرون للجميع في صفحات "المحفّظون/المحفّظات" العامة،
-- لكن الإضافة/التعديل/الحذف للأدمن فقط
alter table public.teachers enable row level security;

create policy "Anyone can view teachers"
  on public.teachers for select
  using (true);

create policy "Admins can insert teachers"
  on public.teachers for insert
  with check (public.is_admin());

create policy "Admins can update teachers"
  on public.teachers for update
  using (public.is_admin());

create policy "Admins can delete teachers"
  on public.teachers for delete
  using (public.is_admin());

-- التقارير: الأدمن يضيف ويشوف الكل، الطالب يشوف تقاريره فقط
alter table public.reports enable row level security;

create policy "Admins manage reports"
  on public.reports for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Students view own reports"
  on public.reports for select
  using (
    exists (select 1 from public.students s where s.id = student_id and s.user_id = auth.uid())
  );

-- رسائل التواصل: أي زائر يقدر يرسل، الأدمن بس يقدر يقرأ
alter table public.contact_messages enable row level security;

create policy "Anyone can send a contact message"
  on public.contact_messages for insert
  with check (true);

create policy "Admins can view contact messages"
  on public.contact_messages for select
  using (public.is_admin());

-- =============================================================
-- صلاحيات لوحتي الطالب والمحفّظ
-- المبدأ: الطالب يرى بياناته فقط (عبر ربط students.user_id بحسابه)،
-- المحفّظ يرى بيانات طلابه فقط (عبر courses.teacher_id)، والأدمن يرى الكل.
-- =============================================================

alter table public.courses enable row level security;
create policy "Students view own courses"
  on public.courses for select
  using (
    public.is_admin()
    or exists (select 1 from public.students s where s.id = student_id and s.user_id = auth.uid())
    or exists (select 1 from public.teachers t where t.id = teacher_id and t.user_id = auth.uid())
  );

alter table public.attendance enable row level security;
create policy "View own attendance"
  on public.attendance for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.courses c
      join public.students s on s.id = c.student_id
      where c.id = course_id and s.user_id = auth.uid()
    )
    or exists (
      select 1 from public.courses c
      join public.teachers t on t.id = c.teacher_id
      where c.id = course_id and t.user_id = auth.uid()
    )
  );
create policy "Teachers manage attendance"
  on public.attendance for all
  using (
    public.is_admin()
    or exists (
      select 1 from public.courses c
      join public.teachers t on t.id = c.teacher_id
      where c.id = course_id and t.user_id = auth.uid()
    )
  );

alter table public.memorization enable row level security;
create policy "View own memorization"
  on public.memorization for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.courses c join public.students s on s.id = c.student_id
      where c.id = course_id and s.user_id = auth.uid()
    )
    or exists (
      select 1 from public.courses c join public.teachers t on t.id = c.teacher_id
      where c.id = course_id and t.user_id = auth.uid()
    )
  );
create policy "Teachers manage memorization"
  on public.memorization for all
  using (
    public.is_admin()
    or exists (
      select 1 from public.courses c join public.teachers t on t.id = c.teacher_id
      where c.id = course_id and t.user_id = auth.uid()
    )
  );

alter table public.revision enable row level security;
create policy "View own revision"
  on public.revision for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.courses c join public.students s on s.id = c.student_id
      where c.id = course_id and s.user_id = auth.uid()
    )
    or exists (
      select 1 from public.courses c join public.teachers t on t.id = c.teacher_id
      where c.id = course_id and t.user_id = auth.uid()
    )
  );
create policy "Teachers manage revision"
  on public.revision for all
  using (
    public.is_admin()
    or exists (
      select 1 from public.courses c join public.teachers t on t.id = c.teacher_id
      where c.id = course_id and t.user_id = auth.uid()
    )
  );

alter table public.notifications enable row level security;
create policy "View own notifications"
  on public.notifications for select
  using (
    public.is_admin()
    or exists (select 1 from public.students s where s.id = student_id and s.user_id = auth.uid())
  );
create policy "Admins send notifications"
  on public.notifications for insert
  with check (public.is_admin());

alter table public.homework_submissions enable row level security;
create policy "Students manage own homework"
  on public.homework_submissions for all
  using (
    public.is_admin()
    or exists (select 1 from public.students s where s.id = student_id and s.user_id = auth.uid())
  )
  with check (
    exists (select 1 from public.students s where s.id = student_id and s.user_id = auth.uid())
  );
create policy "Teachers view students homework"
  on public.homework_submissions for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.courses c
      join public.teachers t on t.id = c.teacher_id
      where c.id = course_id and t.user_id = auth.uid()
    )
  );

-- =============================================================
-- مزامنة تلقائية: عند إنشاء مستخدم جديد في Supabase Auth، يُنشأ له
-- تلقائياً سجل مطابق في public.users بدور افتراضي "student".
-- لتغيير دور مستخدم لاحقاً إلى admin أو teacher، عدّل العمود role يدوياً
-- من Table Editor، أو من لوحة الإدارة بعد بنائها.
-- =============================================================
create or replace function public.handle_new_auth_user()
returns trigger as $$
begin
  insert into public.users (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    'student'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_auth_user();

-- =============================================================
-- إنشاء أول حساب أدمن (نفّذها يدوياً بعد إنشاء أول مستخدم من صفحة
-- Authentication > Users في لوحة تحكم Supabase، أو من نموذج تسجيل مؤقت):
--   update public.users set role = 'admin' where id = '<UUID الخاص بالمستخدم>';
-- =============================================================
