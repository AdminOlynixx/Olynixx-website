import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function Button({ href, children, variant = "primary", className = "" }: Props) {
  const base =
    "inline-flex min-h-[52px] items-center justify-center px-7 text-[15px] font-medium transition-colors duration-150";
  const styles =
    variant === "primary"
      ? "bg-gold text-ink hover:brightness-110"
      : "border border-current hover:border-gold hover:text-gold-dark";
  return (
    <Magnetic>
      <Link href={href} className={`${base} ${styles} ${className}`}>
        {children}
      </Link>
    </Magnetic>
  );
}
