import React from "react";
import Link from "next/link";
import { LogoMark, LogoVariant } from "./LogoMark";

interface LevelfolioLogoProps {
  variant?: LogoVariant;
  iconSize?: number;
  href?: string;
  className?: string;
}

export function LevelfolioLogo({
  variant = "folder-tab",
  iconSize = 32,
  href = "/",
  className = "",
}: LevelfolioLogoProps) {
  const content = (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark variant={variant} size={iconSize} />
      <span className="font-display font-extrabold text-2xl tracking-tight text-[var(--ink)] select-none">
        Level<b className="text-[var(--accent)] font-extrabold">folio</b>
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group hover:opacity-95 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}