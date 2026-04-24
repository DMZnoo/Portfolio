export function TechPill({
  children,
  small,
}: {
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${
        small ? "px-2 py-[2px] text-[10px]" : "px-[11px] py-[3px] text-[11px]"
      }`}
      style={{
        background: "rgba(45, 212, 191, 0.08)",
        color: "#5eead4",
        borderColor: "rgba(45, 212, 191, 0.12)",
        letterSpacing: 0.1,
      }}
    >
      {children}
    </span>
  );
}
