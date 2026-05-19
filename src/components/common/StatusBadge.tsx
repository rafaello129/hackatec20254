interface StatusBadgeProps {
  label: string;
  tone?: "neutral" | "success" | "warning" | "danger";
}

const styles: Record<NonNullable<StatusBadgeProps["tone"]>, string> = {
  neutral: "bg-[#e8e9e2] text-[#42493f]",
  success: "bg-[#D6D979] text-[#3E5902]",
  warning: "bg-[#fff2cc] text-[#7a5d00]",
  danger: "bg-[#ffdad6] text-[#93000a]",
};

export default function StatusBadge({ label, tone = "neutral" }: StatusBadgeProps) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[tone]}`}>{label}</span>;
}
