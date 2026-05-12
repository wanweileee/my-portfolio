export default function Marker({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`text-[11px] uppercase tracking-[0.22em] text-ink-soft ${className}`}
    >
      {children}
    </span>
  );
}
