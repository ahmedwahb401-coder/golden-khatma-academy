// علامة "ربع الحزب" الهندسية المستخدمة في المصحف لتمييز الأجزاء والختمات.
// نستخدمها هنا كعنصر تصميمي متكرر (شعار، خلفيات، فواصل).
export default function RubElHizb({
  className = "",
  opacity = 1,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={{ opacity }}>
      <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <rect
        x="20"
        y="20"
        width="60"
        height="60"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(45 50 50)"
      />
    </svg>
  );
}
