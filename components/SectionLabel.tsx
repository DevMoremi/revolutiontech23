export default function SectionLabel({
  children,
  variant = "cyan",
}: Readonly<{
  children: React.ReactNode;
  variant?: "cyan" | "orange" | "purple";
}>) {
  const styles = {
    cyan: "bg-brand-cyan/20 text-brand-purple-deep",
    orange: "bg-white text-brand-orange",
    purple: "bg-brand-purple/10 text-brand-purple-deep",
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold tracking-wide sm:text-base ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
