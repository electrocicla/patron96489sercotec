import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonTone = "primary" | "secondary" | "quiet" | "danger";

const toneClasses: Record<ButtonTone, string> = {
  primary: "border-civic-blue bg-civic-blue text-white hover:bg-[#1c4c76]",
  secondary: "border-civic-line bg-white text-civic-ink hover:bg-civic-panel",
  quiet: "border-transparent bg-transparent text-civic-blue hover:bg-civic-panel",
  danger: "border-civic-red bg-white text-civic-red hover:bg-[#fff7ed]"
};

const baseClasses =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

interface CommonButtonProps {
  children: ReactNode;
  tone?: ButtonTone;
  className?: string;
}

type ButtonProps = CommonButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonLinkProps = CommonButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button({ children, tone = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button className={`${baseClasses} ${toneClasses[tone]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({ children, tone = "primary", className = "", href, ...props }: ButtonLinkProps) {
  return (
    <Link className={`${baseClasses} ${toneClasses[tone]} ${className}`} href={href} prefetch={false} {...props}>
      {children}
    </Link>
  );
}
