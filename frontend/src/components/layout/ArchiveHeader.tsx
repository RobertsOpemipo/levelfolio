"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Layers, Users, ShieldAlert, Award, Trophy, Home } from "lucide-react";
import { LevelfolioLogo } from "@/components/brand/LevelfolioLogo";
import { usePersona } from "@/components/layout/PersonaSwitcher";

export function ArchiveHeader() {
  const pathname = usePathname();
  const { currentPersona } = usePersona();

  return (
    <header className="border-b border-[var(--line)] bg-[var(--surface)] sticky top-0 z-30">
      <div className="max-w-[1140px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Fixed: LevelfolioLogo renders its own link, NO outer <Link> wrapping */}
        <LevelfolioLogo variant="folder-tab" iconSize={32} href="/" />

        {/* Dynamic Navigation according to Role */}
        <nav className="flex items-center gap-1 text-xs font-label">
          <Link
            href="/"
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
              pathname === "/"
                ? "border-[var(--line)] bg-[var(--bg)] font-bold text-[var(--ink)]"
                : "border-transparent text-[var(--mute)] hover:text-[var(--ink)]"
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Landing</span>
          </Link>

          <Link
            href="/archive/reading-room"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
              pathname.startsWith("/archive/reading-room")
                ? "border-[var(--line)] bg-[var(--bg)] font-bold text-[var(--ink)]"
                : "border-transparent text-[var(--mute)] hover:text-[var(--ink)]"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Reading Room</span>
          </Link>

          <Link
            href="/archive/shelf"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
              pathname.startsWith("/archive/shelf")
                ? "border-[var(--line)] bg-[var(--bg)] font-bold text-[var(--ink)]"
                : "border-transparent text-[var(--mute)] hover:text-[var(--ink)]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Shelf</span>
          </Link>

          {/* New Leaderboard View */}
          <Link
            href="/archive/leaderboard"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
              pathname.startsWith("/archive/leaderboard")
                ? "border-[var(--line)] bg-[var(--bg)] font-bold text-[var(--ink)]"
                : "border-transparent text-[var(--mute)] hover:text-[var(--ink)]"
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Rankings</span>
          </Link>

          {/* Supervisor / Manager View */}
          {(currentPersona.role === "manager" || currentPersona.role === "admin") && (
            <Link
              href="/manager/docket"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                pathname.startsWith("/manager")
                  ? "border-[var(--line)] bg-[var(--bg)] font-bold text-[var(--ink)]"
                  : "border-transparent text-[var(--mute)] hover:text-[var(--ink)]"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Manager</span>
            </Link>
          )}

          {/* Tenant Admin View */}
          {currentPersona.role === "admin" && (
            <Link
              href="/admin/workspace"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                pathname.startsWith("/admin")
                  ? "border-[var(--line)] bg-[var(--bg)] font-bold text-[var(--ink)]"
                  : "border-transparent text-[var(--mute)] hover:text-[var(--ink)]"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          )}

          <Link
            href="/archive/rewards"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
              pathname.startsWith("/archive/rewards")
                ? "border-[var(--line)] bg-[var(--bg)] font-bold text-[var(--ink)]"
                : "border-transparent text-[var(--mute)] hover:text-[var(--ink)]"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Certificates</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}