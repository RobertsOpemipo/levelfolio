"use client";

import React from "react";

export type LogoVariant = "folder-tab" | "stamp" | "card-stairs" | "monogram" | "bookmark";

interface LogoMarkProps {
  variant?: LogoVariant;
  size?: number;
  className?: string;
}

export function LogoMark({ variant = "folder-tab", size = 32, className = "" }: LogoMarkProps) {
  switch (variant) {
    case "stamp":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="rotate(-8 32 32)">
            <circle cx="32" cy="32" r="27" stroke="var(--accent)" strokeWidth="3" />
            <circle cx="32" cy="32" r="21.5" stroke="var(--accent)" strokeWidth="1.5" />
            <text
              x="32"
              y="38.5"
              textAnchor="middle"
              fontFamily="var(--font-courier-prime), Courier Prime, Courier, monospace"
              fontWeight="700"
              fontSize="19"
              fill="var(--accent)"
            >
              LF
            </text>
          </g>
        </svg>
      );

    case "card-stairs":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="6" y="40" width="52" height="15" rx="3" fill="var(--brand)" opacity="0.55" />
          <rect x="13" y="26" width="38" height="15" rx="3" fill="var(--brand)" opacity="0.8" />
          <rect x="20" y="12" width="24" height="15" rx="3" fill="var(--accent)" />
          <path d="M26 19.5h12" stroke="var(--surface)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case "monogram":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="9" y="6" width="22" height="9" rx="3" fill="var(--accent)" />
          <text
            x="8"
            y="56"
            fontFamily="var(--font-fraunces), Georgia, serif"
            fontWeight="800"
            fontSize="56"
            fill="var(--brand)"
          >
            L
          </text>
          <path d="M44 34v18M36 44h16" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case "bookmark":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 6h32v52L32 46 16 58z" fill="var(--brand)" />
          <path
            d="M24 30l8-8 8 8M24 40l8-8 8 8"
            stroke="var(--surface)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="16" y="6" width="32" height="6" fill="var(--accent)" />
        </svg>
      );

    case "folder-tab":
    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Folder Shape */}
          <path
            d="M6 14a4 4 0 0 1 4-4h14l5 6h25a4 4 0 0 1 4 4v30a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z"
            fill="var(--brand)"
          />
          {/* Level-Up Chevron */}
          <path
            d="M21 43l11-12 11 12"
            stroke="var(--surface)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Archive Accent Line */}
          <path d="M6 20h52" stroke="var(--accent)" strokeWidth="3" />
        </svg>
      );
  }
}