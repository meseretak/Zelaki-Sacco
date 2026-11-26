import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  center = false,
  className,
}: {
  children: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "section-label",
        center && "mx-auto",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#6DBE45]" />
      {children}
    </span>
  );
}

export function SectionTitle({
  children,
  center = false,
  className,
}: {
  children: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-[#2C3E50] leading-tight tracking-tight",
        center && "text-center mx-auto",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function SectionWrapper({
  id,
  children,
  className,
  bg = "white",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  bg?: "white" | "muted" | "dark" | "brand";
}) {
  const bgClass = {
    white: "bg-white",
    muted: "bg-[#F8F9FA]",
    dark: "bg-[#0F1A2C] text-white",
    brand: "gradient-brand text-white",
  }[bg];
  return (
    <section id={id} className={cn("py-16 md:py-24", bgClass, className)}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}
