"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Flame,
  Award,
  Users,
  Building2,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  X,
  ChevronRight,
  ThumbsUp,
  Heart,
  Clock,
  Shield,
  ArrowRight,
} from "lucide-react";
import { ArchiveHeader } from "@/components/layout/ArchiveHeader";
import { usePersona } from "@/components/layout/PersonaSwitcher";

interface Cardholder {
  id: string;
  rank: number;
  name: string;
  role: string;
  department: string;
  xpThisWeek: number;
  xpThisMonth: number;
  xpAllTime: number;
  streak: number;
  archivalRank: string;
  cheers: number;
  badges: string[];
  lastCompleted: string;
}

export default function LeaderboardPage() {
  const { currentPersona } = usePersona();

  // Active view states
  const [boardType, setBoardType] = useState<"people" | "teams">("people");
  const [timeframe, setTimeframe] = useState<"week" | "month" | "all">("month");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  // Interaction feedback states
  const [inspectCardholder, setInspectCardholder] = useState<Cardholder | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cardholders Data
  const [cardholders, setCardholders] = useState<Cardholder[]>([
    {
      id: "usr-david",
      rank: 1,
      name: "David Chen",
      role: "Compliance Associate",
      department: "Legal & Corporate Risk",
      xpThisWeek: 120,
      xpThisMonth: 420,
      xpAllTime: 950,
      streak: 5,
      archivalRank: "Reader (Level 2)",
      cheers: 14,
      badges: ["First Entry", "Speed Reader", "100% Audit Ace"],
      lastCompleted: "Cardholder Induction Protocols",
    },
    {
      id: "usr-amara",
      rank: 2,
      name: "Amara Okafor",
      role: "Security Analyst",
      department: "Security Operations",
      xpThisWeek: 75,
      xpThisMonth: 175,
      xpAllTime: 620,
      streak: 3,
      archivalRank: "Cardholder (Level 1)",
      cheers: 9,
      badges: ["First Entry", "Streak Starter"],
      lastCompleted: "Security Essentials Briefing",
    },
    {
      id: "usr-kiran",
      rank: 3,
      name: "Kiran Patel",
      role: "Staff Platform Engineer",
      department: "Platform Engineering",
      xpThisWeek: 50,
      xpThisMonth: 150,
      xpAllTime: 510,
      streak: 2,
      archivalRank: "Cardholder (Level 1)",
      cheers: 6,
      badges: ["First Entry"],
      lastCompleted: "Data Privacy & Subject Access",
    },
    {
      id: "usr-marcus",
      rank: 4,
      name: "Marcus Vance",
      role: "Operations Specialist",
      department: "Security Operations",
      xpThisWeek: 25,
      xpThisMonth: 90,
      xpAllTime: 380,
      streak: 1,
      archivalRank: "Cardholder (Level 1)",
      cheers: 4,
      badges: ["First Entry"],
      lastCompleted: "Workplace Safety & Ergonomics",
    },
    {
      id: "usr-sarah",
      rank: 5,
      name: "Sarah Jenkins",
      role: "Risk Officer",
      department: "Legal & Corporate Risk",
      xpThisWeek: 0,
      xpThisMonth: 25,
      xpAllTime: 290,
      streak: 0,
      archivalRank: "Cardholder (Level 1)",
      cheers: 2,
      badges: ["First Entry"],
      lastCompleted: "Annual Information Security Standards",
    },
  ]);

  // Department Standings Data
  const departments = [
    {
      rank: 1,
      name: "Legal & Corporate Risk",
      manager: "Elena Rostova",
      staffCount: 8,
      completionRate: 100,
      totalXp: 1480,
      bestStreak: 12,
      status: "100% Certified",
    },
    {
      rank: 2,
      name: "Security Operations",
      manager: "Tunde Bakare",
      staffCount: 14,
      completionRate: 85,
      totalXp: 1120,
      bestStreak: 6,
      status: "On Track",
    },
    {
      rank: 3,
      name: "Platform Engineering",
      manager: "Kiran Patel",
      staffCount: 32,
      completionRate: 68,
      totalXp: 890,
      bestStreak: 3,
      status: "Needs Review",
    },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendCheer = (id: string, name: string) => {
    setCardholders((prev) =>
      prev.map((c) => (c.id === id ? { ...c, cheers: c.cheers + 1 } : c))
    );
    showToast(`👏 You cheered ${isAnonymous && id === "usr-amara" ? "yourself" : name}!`);
  };

  // Get current XP according to selected timeframe
  const getXp = (c: Cardholder) => {
    if (timeframe === "week") return c.xpThisWeek;
    if (timeframe === "month") return c.xpThisMonth;
    return c.xpAllTime;
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] pb-28">
      <ArchiveHeader />

      <main className="max-w-[1140px] mx-auto px-6 py-8 space-y-8">
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-emerald-900 text-white px-4 py-3 rounded-xl shadow-lg border border-emerald-700 flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-sans font-bold">{toastMessage}</span>
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-label text-[11px] font-bold text-[var(--accent)] uppercase tracking-wider">
                COMMUNITY STANDINGS // ACME CORP
              </span>
              <span className="text-[var(--mute)]">•</span>
              <span className="text-xs text-[var(--mute)]">All Departments</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
              Rankings &amp; Momentum
            </h1>
            <p className="text-xs text-[var(--mute)] mt-1">
              See who is finishing index cards, maintaining daily streaks, and leading team compliance.
            </p>
          </div>

          {/* Quick Actions Header */}
          <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
            <button
              onClick={() => setShowHowItWorks(!showHowItWorks)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-xs font-bold hover:bg-[var(--tint)] transition-all cursor-pointer shadow-xs"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[var(--brand)]" />
              <span>{showHowItWorks ? "Hide Rules" : "How Points Work"}</span>
            </button>

            {/* Privacy Mode Button */}
            <button
              onClick={() => {
                setIsAnonymous(!isAnonymous);
                showToast(isAnonymous ? "Your name is now visible on the leaderboard." : "Privacy Mode active: Your name is masked as Archivist #204.");
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-xs ${
                isAnonymous
                  ? "bg-amber-50 border-amber-300 text-amber-800"
                  : "bg-[var(--surface)] border-[var(--line)] text-[var(--mute)] hover:text-[var(--ink)]"
              }`}
            >
              {isAnonymous ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-amber-600" />
                  <span>Privacy Mode ON</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Visible (Click to Hide)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* EXPANDABLE "HOW IT WORKS" HELP ACCORDION */}
        {showHowItWorks && (
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs space-y-4 animate-in fade-in duration-200">
            <div className="flex justify-between items-center pb-2 border-b border-[var(--line)]">
              <h3 className="font-display font-bold text-base text-[var(--ink)] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                Plain-English Guide to Levelfolio Points
              </h3>
              <button
                onClick={() => setShowHowItWorks(false)}
                className="text-[var(--mute)] hover:text-[var(--ink)] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
              <div className="p-4 rounded-xl bg-[var(--tint)]/40 border border-[var(--line)] space-y-1.5">
                <div className="font-bold text-[var(--brand)] flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Earn +25 to +50 XP
                </div>
                <p className="text-[var(--mute)] leading-relaxed">
                  Earned whenever you finish a 2-minute index card or pass a quick knowledge check on time.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--tint)]/40 border border-[var(--line)] space-y-1.5">
                <div className="font-bold text-[var(--accent)] flex items-center gap-1.5">
                  <Flame className="w-4 h-4" /> Keep Daily Streaks
                </div>
                <p className="text-[var(--mute)] leading-relaxed">
                  Study for just 3 minutes each day to grow your flame. A streak bonus awards +15 XP every consecutive day.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--tint)]/40 border border-[var(--line)] space-y-1.5">
                <div className="font-bold text-[var(--ok)] flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> Respect for Privacy
                </div>
                <p className="text-[var(--mute)] leading-relaxed">
                  Leaderboards are 100% voluntary. You can click <b>Privacy Mode</b> anytime to hide your name from peers.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TOP PODIUM (Top 3 Visual Highlight) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          {/* Rank 2 */}
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs flex flex-col justify-between order-2 sm:order-1 relative">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="w-8 h-8 rounded-full bg-slate-100 border border-[var(--line)] flex items-center justify-center font-display font-extrabold text-slate-700 text-sm">
                  2
                </span>
                <span className="font-label text-[10px] text-[var(--mute)] font-bold uppercase">
                  RUNNER UP
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-[var(--ink)]">
                  {isAnonymous ? "Archivist #204 (You)" : cardholders[1].name}
                </h3>
                <p className="text-xs text-[var(--mute)]">
                  {cardholders[1].department}
                </p>
                <div className="mt-1 text-[10px] font-label font-bold text-[var(--brand)]">
                  {cardholders[1].archivalRank}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--line)] flex justify-between items-center text-xs font-label mt-4">
              <span className="font-extrabold text-[var(--brand)] text-sm">{getXp(cardholders[1])} XP</span>
              <button
                onClick={() => handleSendCheer(cardholders[1].id, cardholders[1].name)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[var(--line)] bg-[var(--bg)] hover:bg-[var(--tint)] active:scale-95 transition-all cursor-pointer font-sans text-xs font-bold"
              >
                <span>👏 {cardholders[1].cheers}</span>
              </button>
            </div>
          </div>

          {/* Rank 1: Crown Holder */}
          <div className="bg-[var(--surface)] border-2 border-[var(--brand)] rounded-2xl p-6 sm:p-7 shadow-md flex flex-col justify-between order-1 sm:order-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[var(--brand)] text-white text-[10px] font-label font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              TOP SCHOLAR 👑
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[var(--tint)] border border-[var(--brand)]/30 flex items-center justify-center font-display font-black text-xl text-[var(--brand)]">
                🥇
              </div>

              <div>
                <h3 className="font-display font-extrabold text-xl text-[var(--ink)]">
                  {cardholders[0].name}
                </h3>
                <p className="text-xs text-[var(--mute)]">
                  {cardholders[0].department}
                </p>
                <div className="mt-1 inline-block text-[10px] font-label font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {cardholders[0].archivalRank}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--line)] flex justify-between items-center text-xs font-label mt-4">
              <div>
                <span className="font-black text-[var(--brand)] text-base">{getXp(cardholders[0])} XP</span>
                <span className="block text-[10px] text-[var(--accent)] font-bold">🔥 5-Day Streak</span>
              </div>
              <button
                onClick={() => handleSendCheer(cardholders[0].id, cardholders[0].name)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--brand)] bg-[var(--tint)] text-[var(--brand)] hover:opacity-90 active:scale-95 transition-all cursor-pointer font-sans text-xs font-bold"
              >
                <span>Cheer 👏 {cardholders[0].cheers}</span>
              </button>
            </div>
          </div>

          {/* Rank 3 */}
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs flex flex-col justify-between order-3 relative">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center font-display font-extrabold text-amber-700 text-sm">
                  3
                </span>
                <span className="font-label text-[10px] text-[var(--mute)] font-bold uppercase">
                  3RD PLACE
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-[var(--ink)]">
                  {cardholders[2].name}
                </h3>
                <p className="text-xs text-[var(--mute)]">
                  {cardholders[2].department}
                </p>
                <div className="mt-1 text-[10px] font-label font-bold text-[var(--mute)]">
                  {cardholders[2].archivalRank}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--line)] flex justify-between items-center text-xs font-label mt-4">
              <span className="font-extrabold text-[var(--brand)] text-sm">{getXp(cardholders[2])} XP</span>
              <button
                onClick={() => handleSendCheer(cardholders[2].id, cardholders[2].name)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[var(--line)] bg-[var(--bg)] hover:bg-[var(--tint)] active:scale-95 transition-all cursor-pointer font-sans text-xs font-bold"
              >
                <span>👏 {cardholders[2].cheers}</span>
              </button>
            </div>
          </div>
        </div>

        {/* CONTROLS: Switch View (People vs Teams) + Timeframe */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          {/* Board Category Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-[var(--surface)] border border-[var(--line)] rounded-xl w-fit">
            <button
              onClick={() => setBoardType("people")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                boardType === "people"
                  ? "bg-[var(--brand)] text-white shadow-xs"
                  : "text-[var(--mute)] hover:text-[var(--ink)]"
              }`}
            >
              Cardholders ({cardholders.length})
            </button>
            <button
              onClick={() => setBoardType("teams")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                boardType === "teams"
                  ? "bg-[var(--brand)] text-white shadow-xs"
                  : "text-[var(--mute)] hover:text-[var(--ink)]"
              }`}
            >
              Departments ({departments.length})
            </button>
          </div>

          {/* Timeframe Filter (When viewing Cardholders) */}
          {boardType === "people" && (
            <div className="flex items-center gap-1 p-1 bg-[var(--surface)] border border-[var(--line)] rounded-xl self-start sm:self-auto text-xs font-label">
              <button
                onClick={() => setTimeframe("week")}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  timeframe === "week"
                    ? "bg-[var(--brand)] text-white"
                    : "text-[var(--mute)] hover:text-[var(--ink)]"
                }`}
              >
                This Week
              </button>
              <button
                onClick={() => setTimeframe("month")}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  timeframe === "month"
                    ? "bg-[var(--brand)] text-white"
                    : "text-[var(--mute)] hover:text-[var(--ink)]"
                }`}
              >
                This Month
              </button>
              <button
                onClick={() => setTimeframe("all")}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  timeframe === "all"
                    ? "bg-[var(--brand)] text-white"
                    : "text-[var(--mute)] hover:text-[var(--ink)]"
                }`}
              >
                All-Time
              </button>
            </div>
          )}
        </div>

        {/* VIEW 1: Individual Cardholders Table */}
        {boardType === "people" && (
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-display text-lg font-bold text-[var(--ink)]">
                  Active Cardholders Standings
                </h3>
                <p className="text-xs text-[var(--mute)]">
                  Click any cardholder to view their badges and study history.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--line)] text-[10px] font-label font-bold uppercase text-[var(--mute)]">
                    <th className="py-3 px-4 w-12">Rank</th>
                    <th className="py-3 px-4">Cardholder</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Daily Streak</th>
                    <th className="py-3 px-4">Points ({timeframe.toUpperCase()})</th>
                    <th className="py-3 px-4 text-right">Encourage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)]/60 text-xs font-sans">
                  {cardholders.map((person) => {
                    const isUserRow = person.id === "usr-amara";
                    const displayName = isUserRow && isAnonymous ? "Archivist #204 (You - Masked)" : person.name;

                    return (
                      <tr
                        key={person.id}
                        className={`hover:bg-[var(--tint)]/30 transition-colors ${
                          isUserRow ? "bg-[var(--tint)]/40 font-semibold" : ""
                        }`}
                      >
                        {/* Rank */}
                        <td className="py-4 px-4 font-display font-extrabold text-sm text-[var(--mute)]">
                          #{person.rank}
                        </td>

                        {/* Name (Click to open details drawer) */}
                        <td className="py-4 px-4">
                          <button
                            onClick={() => setInspectCardholder(person)}
                            className="text-left group cursor-pointer"
                          >
                            <div className="font-bold text-[var(--ink)] group-hover:text-[var(--brand)] flex items-center gap-2">
                              <span>{displayName}</span>
                              {isUserRow && (
                                <span className="text-[10px] font-label font-bold text-[var(--brand)] bg-[var(--tint)] border border-[var(--line)] px-2 py-0.5 rounded">
                                  YOU
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[var(--mute)] font-normal">
                              {person.role} • {person.archivalRank}
                            </div>
                          </button>
                        </td>

                        {/* Department */}
                        <td className="py-4 px-4 text-[var(--mute)]">
                          {person.department}
                        </td>

                        {/* Streak */}
                        <td className="py-4 px-4 font-label text-xs">
                          {person.streak > 0 ? (
                            <span className="font-bold text-[var(--accent)] flex items-center gap-1">
                              <Flame className="w-3.5 h-3.5 fill-current" /> {person.streak} Days
                            </span>
                          ) : (
                            <span className="text-[var(--mute)] font-normal">0 Days</span>
                          )}
                        </td>

                        {/* XP */}
                        <td className="py-4 px-4 font-label font-extrabold text-sm text-[var(--brand)]">
                          {getXp(person)} XP
                        </td>

                        {/* Cheer Action */}
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => handleSendCheer(person.id, person.name)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] text-xs font-bold hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95 transition-all cursor-pointer shadow-xs"
                          >
                            <span>👏 {person.cheers}</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 2: Department Standings (Teams) */}
        {boardType === "teams" && (
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs space-y-4">
            <div>
              <h3 className="font-display text-lg font-bold text-[var(--ink)]">
                Department Compliance &amp; Team Momentum
              </h3>
              <p className="text-xs text-[var(--mute)]">
                Teams compete on on-time completion rates rather than individual speed.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--line)] text-[10px] font-label font-bold uppercase text-[var(--mute)]">
                    <th className="py-3 px-4 w-12">Rank</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Team Lead</th>
                    <th className="py-3 px-4">Staff Count</th>
                    <th className="py-3 px-4">Completion %</th>
                    <th className="py-3 px-4">Team XP</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)]/60 text-xs font-sans">
                  {departments.map((dept) => (
                    <tr key={dept.name} className="hover:bg-[var(--tint)]/30 transition-colors">
                      <td className="py-4 px-4 font-display font-extrabold text-sm text-[var(--mute)]">
                        #{dept.rank}
                      </td>
                      <td className="py-4 px-4 font-bold text-[var(--ink)]">
                        {dept.name}
                      </td>
                      <td className="py-4 px-4 text-[var(--mute)]">
                        {dept.manager}
                      </td>
                      <td className="py-4 px-4 font-label text-xs">
                        {dept.staffCount} cardholders
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold font-label text-xs">{dept.completionRate}%</span>
                          <div className="w-16 h-1.5 bg-[var(--tint)] rounded-full overflow-hidden border border-[var(--line)]">
                            <div
                              className="h-full bg-[var(--ok)] rounded-full"
                              style={{ width: `${dept.completionRate}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-label font-extrabold text-sm text-[var(--brand)]">
                        {dept.totalXp} XP
                      </td>
                      <td className="py-4 px-4 text-right">
                        {dept.status === "100% Certified" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold font-label text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3" /> All Certified
                          </span>
                        )}
                        {dept.status === "On Track" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold font-label text-[var(--brand)] bg-[var(--tint)] border border-[var(--line)] px-2 py-0.5 rounded">
                            Healthy
                          </span>
                        )}
                        {dept.status === "Needs Review" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold font-label text-amber-800 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded">
                            Needs Review
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DRAWER: Inspect Cardholder Details */}
        {inspectCardholder && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-end">
            <div className="bg-[var(--surface)] border-l border-[var(--line)] w-full max-w-md h-full p-6 sm:p-8 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
              <div className="space-y-6">
                <div className="flex justify-between items-start pb-4 border-b border-[var(--line)]">
                  <div>
                    <span className="font-label text-[10px] font-bold text-[var(--accent)] uppercase tracking-wider">
                      SCHOLAR DOSSIER // #{inspectCardholder.rank}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl text-[var(--ink)] mt-0.5">
                      {inspectCardholder.name}
                    </h3>
                    <p className="text-xs text-[var(--mute)]">
                      {inspectCardholder.role} • {inspectCardholder.department}
                    </p>
                  </div>

                  <button
                    onClick={() => setInspectCardholder(null)}
                    className="p-1.5 rounded-lg text-[var(--mute)] hover:text-[var(--ink)] hover:bg-[var(--tint)] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Metric Summary */}
                <div className="grid grid-cols-2 gap-3 font-label text-xs">
                  <div className="p-3.5 rounded-xl border border-[var(--line)] bg-[var(--tint)]/40 space-y-0.5">
                    <span className="text-[10px] text-[var(--mute)]">TOTAL ACCUMULATED XP</span>
                    <span className="font-display font-bold text-lg text-[var(--brand)] block">
                      {inspectCardholder.xpAllTime} XP
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-[var(--line)] bg-[var(--tint)]/40 space-y-0.5">
                    <span className="text-[10px] text-[var(--mute)]">CURRENT STREAK</span>
                    <span className="font-display font-bold text-lg text-[var(--accent)] flex items-center gap-1">
                      <Flame className="w-4 h-4 fill-current" /> {inspectCardholder.streak} Days
                    </span>
                  </div>
                </div>

                {/* Library Stamps (Badges) Unlocked */}
                <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] space-y-3">
                  <span className="font-label text-[10px] font-bold text-[var(--brand)] uppercase tracking-wider">
                    UNLOCKED LIBRARY STAMPS ({inspectCardholder.badges.length})
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {inspectCardholder.badges.map((b) => (
                      <span
                        key={b}
                        className="inline-flex items-center gap-1 text-[11px] font-label font-bold px-2.5 py-1 rounded bg-[var(--tint)] border border-[var(--line)] text-[var(--brand)]"
                      >
                        <Award className="w-3.5 h-3.5 text-[var(--ok)]" /> {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Latest Achievement */}
                <div className="p-4 rounded-xl border border-dashed border-[var(--line)] space-y-1">
                  <span className="text-[10px] font-label text-[var(--mute)] uppercase">
                    LATEST COURSE COMPLETED:
                  </span>
                  <div className="font-bold text-xs text-[var(--ink)]">
                    {inspectCardholder.lastCompleted}
                  </div>
                  <p className="text-[11px] text-emerald-700 font-label flex items-center gap-1 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Passed 100% Final Audit
                  </p>
                </div>
              </div>

              {/* Bottom Drawer Action */}
              <div className="pt-6 border-t border-[var(--line)] flex items-center gap-3">
                <button
                  onClick={() => {
                    handleSendCheer(inspectCardholder.id, inspectCardholder.name);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--brand)] text-white text-xs font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-xs"
                >
                  <span>Cheer Them On 👏 ({inspectCardholder.cheers})</span>
                </button>

                <button
                  onClick={() => setInspectCardholder(null)}
                  className="px-4 py-2.5 rounded-xl border border-[var(--line)] text-xs font-bold hover:bg-[var(--tint)] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}