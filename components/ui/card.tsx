import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return <section className={`rounded-lg border border-civic-line bg-white shadow-sm ${className}`}>{children}</section>;
}

export function CardHeader({ children, className = "" }: CardProps) {
  return <div className={`border-b border-civic-line p-5 ${className}`}>{children}</div>;
}

export function CardBody({ children, className = "" }: CardProps) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}
