"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Flame,
  Shield,
  Award,
  CheckCircle2,
  Clock,
  Users,
  Eye,
  EyeOff,
  Lock,
  ChevronRight,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { ArchiveHeader } from "@/components/layout/ArchiveHeader";

export default function ReadingRoomPage() {
  const [optOut, setOptOut] = useState(false);
  const [selectedStamp, setSelectedStamp] = useState<string | null>("induction");

  // Dynamic Animated XP Progress
  const [displayXp, setDisplayXp] = useState(0);
  const targetXp = 100;
  const maxTierXp = 250;

  useEffect(() => {
    let current = 0;
    const step = 2;
    const interval = setInterval(() => {
      current += step;
      if (current >= targetXp) {
        setDisplayXp(targetXp);
        clearInterval(interval);
      } else {
        setDisplayXp(current);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [targetXp]);

  const xpPercent = Math.min(Math.round((displayXp / maxTierXp) * 100), 100);

  // Trail Map Steps
  const trailSteps = [
    {
      id: "step-1",
      stepNum: "01",
      title: "Core Operating Protocols",
      xp: 20,
      status: "done",
      time: "4 min",
    },
    {
      id: "step-2",
      stepNum: "02",
      title: "Confidential Document Handling",
      xp: 30,
      status: "now",
      time: "6 min",
    },
    {
      id: "step-3",
      stepNum: "03",
      title: "Security & Retention Standards",
      xp: 25,
      status: "locked",
      time: "5 min",
    },
    {
      id: "step-4",
      stepNum: "04",
      title: "Team Operational Missions",
      xp: 35,
      status: "locked",
      time: "8 min",
    },
    {
      id: "step-5",
      stepNum: "05",
      title: "Final Audit Challenge",
      xp: 50,
      status: "locked",
      time: "10 min",
    },
  ];

  // Return-by Slips with calculated urgency
  const returnSlips = [
    {
      id: "slip-1",
      title: "Cardholder Induction Protocols",
      dueDate: "Oct 8, 2026",
      daysLeft: 6,
      isUrgent: true,
    },
    {
      id: "slip-2",
      title: "Annual Information Security Audit",
      dueDate: "Oct 15, 2026",
      daysLeft: 13,
      isUrgent: false,
    },
    {
      id: "slip-3",
      title: "Data Subject Access Request (DSAR) Handling",
      dueDate: "Oct 30, 2026",
      daysLeft: 28,
      isUrgent: false,
    },
  ];

  // Stamps Ledger
  const stamps = [
    {
      id: "induction",
      title: "First Entry Stamp",
      issuedOn: "Oct 1, 2026",
      desc: "Completed orientation file.",
      status: "unlocked",
    },
    {
      id: "perfect-audit",
      title: "Flawless Audit Stamp",
      issuedOn: null,
      desc: "Pass any Final Audit with 100% on first attempt.",
      status: "locked",
    },
    {
      id: "streak-master",
      title: "7-Day Archivist",
      issuedOn: null,
      desc: "Maintain a 7-day learning streak.",
      status: "locked",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <ArchiveHeader />

      <main className="max-w-[1140px] mx-auto px-6 py-8 space-y-8">
        {/* Header & Dynamic Rank Card */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Cardholder Identity */}
          <div className="lg:col-span-2 bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-label text-[11px] font-bold text-[var(--accent)] tracking-wider uppercase">
                AMARA OKAFOR
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight mt-1">
                Reading Room
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 mt-4 border-t border-[var(--line)]/70 text-xs font-label">
              <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-[var(--accent)] px-3 py-1 rounded-full font-bold">
                <Flame className="w-3.5 h-3.5 fill-current" /> 3-DAY STREAK
              </span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full font-bold">
                <Shield className="w-3.5 h-3.5 text-emerald-700" /> INDUCTED
              </span>
            </div>
          </div>

          {/* Right: Rank Trajectory Card */}
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-1.5 text-xs font-label font-bold text-[var(--brand)]">
                <TrendingUp className="w-4 h-4 text-[var(--brand)]" />
                <span>LEVEL 1 · CARDHOLDER</span>
              </div>
              <span className="font-label text-[11px] font-bold text-[var(--brand)]">
                {displayXp} / {maxTierXp} XP
              </span>
            </div>

            <div className="space-y-2 my-2">
              <div className="h-2.5 w-full bg-[var(--tint)] rounded-full overflow-hidden border border-[var(--line)]">
                <div
                  className="h-full bg-gradient-to-r from-[var(--brand)] to-[var(--ok)] rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[11px] font-label text-[var(--mute)]">
                <span>{xpPercent}% complete</span>
                <span>{maxTierXp - displayXp} XP to Level 2 (Reader)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Physical Folder Cutout Card */}
        <section className="pt-2">
          <div className="relative">
            {/* Folder Tab */}
            <div className="flex items-center">
              <div className="bg-[var(--surface)] border-t border-x border-[var(--line)] rounded-t-xl px-5 py-1.5 inline-flex items-center gap-2 z-10 translate-y-[1px]">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="font-label text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
                  ACTIVE FILE #SEC-01
                </span>
              </div>
            </div>

            {/* Folder Container */}
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl rounded-tl-none p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--ink)] leading-snug">
                    Welcome to the Archive: Cardholder Protocols
                  </h2>

                  <p className="text-sm text-[var(--mute)] leading-relaxed">
                    Complete retention standards and confidentiality tagging to finalize your onboarding.
                  </p>

                  {/* Return Slip */}
                  <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg border-2 border-dashed border-[var(--accent)] bg-orange-50/70 font-label text-xs text-[var(--accent)] font-semibold">
                    <Clock className="w-4 h-4 text-[var(--accent)]" />
                    <span>RETURN BY: <b>OCT 8, 2026</b></span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--accent)]/30">
                      6 DAYS LEFT
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 border-t lg:border-t-0 lg:border-l border-[var(--line)] pt-4 lg:pt-0 lg:pl-8 shrink-0">
                  <div className="space-y-0.5 lg:text-right">
                    <div className="font-label text-[11px] text-[var(--mute)] font-bold uppercase">
                      POSITION
                    </div>
                    <div className="font-display font-bold text-base text-[var(--ink)]">
                      Index Card 2 of 3
                    </div>
                  </div>

                  <Link
                    href="/archive/files/00000003-0000-0000-0000-000000000001"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--brand)] text-white font-sans text-xs font-bold hover:opacity-90 active:scale-95 shadow-sm transition-all"
                  >
                    <span>Resume Card 02</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trail Map */}
        <section className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
            <h3 className="font-display text-lg font-bold text-[var(--ink)]">
              Induction Trail Map
            </h3>
            <span className="text-xs font-label text-[var(--mute)]">
              1 of 5 Steps Finished
            </span>
          </div>

          {/* Connected Steps Reel */}
          <div className="relative pt-1">
            {/* Background Rail */}
            <div className="absolute top-[38px] left-6 right-6 h-[3px] bg-[var(--line)] z-0 hidden md:block" />
            <div className="absolute top-[38px] left-6 h-[3px] bg-[var(--ok)] z-0 hidden md:block w-[26%]" />

            <div className="flex gap-4 overflow-x-auto pb-3 pt-1 scroll-smooth relative z-10">
              {trailSteps.map((step) => {
                const isDone = step.status === "done";
                const isNow = step.status === "now";
                const isLocked = step.status === "locked";

                return (
                  <div
                    key={step.id}
                    className={`flex-none w-[200px] rounded-xl border p-4 flex flex-col justify-between transition-all relative ${
                      isDone
                        ? "bg-[var(--surface)] border-emerald-400 shadow-xs ring-1 ring-emerald-300"
                        : isNow
                        ? "bg-[var(--surface)] border-2 border-[var(--accent)] shadow-md ring-3 ring-[var(--accent)]/10"
                        : "bg-[var(--tint)]/40 border-[var(--line)] opacity-60"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-display text-2xl font-extrabold leading-none text-[var(--ink)]">
                        {step.stepNum}
                      </span>
                      {isDone && (
                        <span className="inline-flex items-center gap-1 font-label text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3" /> DONE
                        </span>
                      )}
                      {isNow && (
                        <span className="font-label text-[10px] font-bold text-[var(--accent)] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                          ACTIVE
                        </span>
                      )}
                      {isLocked && <Lock className="w-3.5 h-3.5 text-[var(--mute)]" />}
                    </div>

                    <h4 className="font-sans font-bold text-xs text-[var(--ink)] line-clamp-2 leading-snug mb-3">
                      {step.title}
                    </h4>

                    <div className="flex items-center justify-between pt-2 border-t border-[var(--line)]/60 text-[10px] font-label text-[var(--mute)]">
                      <span>{step.time}</span>
                      <span className="font-bold text-[var(--brand)]">+{step.xp} XP</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Lower Grid: Return Slips, Team Mission & Stamps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Return Slips & Team Mission */}
          <div className="lg:col-span-2 space-y-6">
            {/* Return-by Slips */}
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[var(--accent)]" />
                  <h3 className="font-label text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                    RETURN-BY SLIPS
                  </h3>
                </div>
                <Link
                  href="/archive/shelf"
                  className="text-xs font-semibold text-[var(--brand)] hover:underline flex items-center gap-0.5"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Slips List */}
              <div className="space-y-2.5">
                {returnSlips.map((slip) => (
                  <div
                    key={slip.id}
                    className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs ${
                      slip.isUrgent
                        ? "border-2 border-dashed border-[var(--accent)] bg-orange-50/40"
                        : "border-[var(--line)] bg-[var(--surface)]"
                    }`}
                  >
                    <div className="text-xs font-bold text-[var(--ink)]">
                      {slip.title}
                    </div>

                    <div
                      className={`inline-flex items-center gap-2 font-label text-xs px-2.5 py-1 rounded-lg shrink-0 ${
                        slip.isUrgent
                          ? "bg-[var(--surface)] border border-[var(--accent)] text-[var(--accent)] font-bold shadow-2xs"
                          : "bg-[var(--tint)] border border-[var(--line)] text-[var(--mute)] font-medium"
                      }`}
                    >
                      {slip.isUrgent ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-[var(--mute)] shrink-0" />
                      )}
                      <span>DUE: {slip.dueDate}</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          slip.isUrgent
                            ? "bg-[var(--accent)] text-white"
                            : "bg-[var(--surface)] text-[var(--mute)] border border-[var(--line)]"
                        }`}
                      >
                        {slip.daysLeft}d left
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Docket */}
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[var(--brand)]" />
                  <h3 className="font-label text-xs font-bold uppercase text-[var(--ink)]">
                    TEAM GOAL // SECURITY OPS
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOptOut(!optOut)}
                  className="font-label text-[10px] text-[var(--mute)] hover:text-[var(--ink)] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {optOut ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-[var(--accent)]" /> Hidden
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 text-[var(--ok)]" /> Visible
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-[var(--mute)]">Team Induction Rate</span>
                  <span className="font-label font-bold text-[var(--ink)]">85% Complete</span>
                </div>
                <div className="h-2 w-full bg-[var(--tint)] rounded-full overflow-hidden border border-[var(--line)]">
                  <div className="h-full bg-emerald-600 rounded-full w-[85%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Library Stamp Ledger */}
          <div className="space-y-4">
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[var(--brand)]" />
                  <h3 className="font-label text-xs font-bold uppercase text-[var(--ink)]">
                    STAMPS EARNED
                  </h3>
                </div>
                <span className="font-label text-[10px] font-bold text-[var(--ok)]">
                  1 OF 3
                </span>
              </div>

              {/* Stamps Stack */}
              <div className="space-y-2.5">
                {stamps.map((stamp) => {
                  const isUnlocked = stamp.status === "unlocked";
                  const isSelected = selectedStamp === stamp.id;

                  return (
                    <div
                      key={stamp.id}
                      onClick={() => setSelectedStamp(stamp.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "border-[var(--brand)] ring-1 ring-[var(--brand)] bg-[var(--surface)]"
                          : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--line)]/80"
                      } ${!isUnlocked && "opacity-50"}`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="font-sans font-bold text-xs text-[var(--ink)]">
                          {stamp.title}
                        </div>
                        {isUnlocked ? (
                          <span className="text-emerald-700 font-label text-[9px] font-bold uppercase">
                            EARNED
                          </span>
                        ) : (
                          <span className="font-label text-[9px] text-[var(--mute)]">
                            LOCKED
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-[var(--mute)] leading-relaxed">
                        {stamp.desc}
                      </p>

                      {isUnlocked && stamp.issuedOn && (
                        <div className="mt-1.5 text-[10px] font-label text-[var(--mute)] border-t border-[var(--line)]/60 pt-1">
                          Earned on: {stamp.issuedOn}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <Link
                href="/archive/rewards"
                className="block text-center font-label text-xs text-[var(--brand)] font-bold hover:underline pt-2 border-t border-[var(--line)]"
              >
                View Certificates →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}