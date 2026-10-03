"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Video,
  FileText,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  Award,
} from "lucide-react";
import { ArchiveHeader } from "@/components/layout/ArchiveHeader";

export default function CoursePlayerPage() {
  const [activeCard, setActiveCard] = useState(1);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizError, setQuizError] = useState(false);
  const [auditPassed, setAuditPassed] = useState(false);

  const cards = [
    { id: 1, title: "1. Core Protocols", type: "text", time: "2 min" },
    { id: 2, title: "2. Confidential Records", type: "video", time: "3 min" },
    { id: 3, title: "3. Final Audit", type: "quiz", time: "1 question" },
  ];

  const handleAuditSubmit = () => {
    if (quizAnswer === 1) {
      setQuizError(false);
      setAuditPassed(true);
    } else {
      setQuizError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <ArchiveHeader />

      <main className="max-w-[1140px] mx-auto px-6 py-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/archive/reading-room"
            className="inline-flex items-center gap-1.5 font-label text-xs font-bold text-[var(--mute)] hover:text-[var(--ink)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Reading Room</span>
          </Link>

          <span className="font-label text-xs text-[var(--mute)]">
            Card {activeCard} of {cards.length}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Drawer Navigation */}
          <div className="lg:col-span-1 space-y-2">
            <span className="font-label text-[10px] font-bold uppercase tracking-wider text-[var(--mute)] block mb-2">
              COURSE CARDS
            </span>

            <div className="space-y-1.5">
              {cards.map((card) => {
                const isActive = activeCard === card.id;
                const isCardDone = card.id < activeCard || (card.id === 3 && auditPassed);

                return (
                  <button
                    key={card.id}
                    onClick={() => {
                      setActiveCard(card.id);
                      setQuizError(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? "bg-[var(--surface)] border-[var(--brand)] shadow-xs ring-1 ring-[var(--brand)] font-bold"
                        : "bg-[var(--surface)] border-[var(--line)] text-[var(--mute)] hover:text-[var(--ink)]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {card.type === "text" && (
                        <FileText className={`w-4 h-4 shrink-0 ${isActive ? "text-[var(--brand)]" : "text-[var(--mute)]"}`} />
                      )}
                      {card.type === "video" && (
                        <Video className={`w-4 h-4 shrink-0 ${isActive ? "text-[var(--accent)]" : "text-[var(--mute)]"}`} />
                      )}
                      {card.type === "quiz" && (
                        <HelpCircle className={`w-4 h-4 shrink-0 ${isActive ? "text-[var(--ok)]" : "text-[var(--mute)]"}`} />
                      )}
                      <span className="text-xs truncate">{card.title}</span>
                    </div>

                    {isCardDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--ok)] shrink-0 ml-2" />
                    ) : (
                      <span className="text-[10px] font-label text-[var(--mute)] shrink-0 ml-2">
                        {card.time}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Card Reading Area */}
          <div className="lg:col-span-3 bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 sm:p-10 shadow-xs min-h-[440px] flex flex-col justify-between">
            {/* CARD 1: Text Lesson */}
            {activeCard === 1 && (
              <div className="space-y-6">
                <div>
                  <span className="font-label text-[10px] font-bold text-[var(--accent)] uppercase tracking-wider">
                    LESSON 1 // 2 MIN READ
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mt-1">
                    Core Operating Protocols
                  </h2>
                </div>

                <div className="text-sm text-[var(--mute)] leading-relaxed space-y-4 max-w-2xl">
                  <p>
                    Every document in the system is linked to your cardholder profile. All actions are logged to ensure company compliance records remain accurate and verifiable.
                  </p>
                  <p>
                    Each training task is governed by a <strong>Return-by Slip</strong>. Completing lessons on or before your slip deadline keeps your record clear and unlocks official stamps for your profile.
                  </p>
                </div>

                <div className="pt-6 border-t border-[var(--line)] flex justify-end">
                  <button
                    onClick={() => setActiveCard(2)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--brand)] text-white text-xs font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-xs"
                  >
                    <span>Proceed to Video Briefing</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* CARD 2: Video Lesson */}
            {activeCard === 2 && (
              <div className="space-y-6">
                <div>
                  <span className="font-label text-[10px] font-bold text-[var(--accent)] uppercase tracking-wider">
                    LESSON 2 // VIDEO BRIEFING
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mt-1">
                    Handling Sensitive Records
                  </h2>
                </div>

                {/* Video Placeholder Container */}
                <div className="border border-[var(--line)] bg-slate-900 rounded-xl aspect-video flex flex-col items-center justify-center text-white p-6 text-center max-w-2xl mx-auto">
                  <Video className="w-10 h-10 text-[var(--accent)] mb-2" />
                  <p className="font-sans font-bold text-sm">3-Minute Briefing Player</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Review required procedures for handling customer data and confidential files.
                  </p>
                </div>

                <div className="pt-6 border-t border-[var(--line)] flex items-center justify-between">
                  <button
                    onClick={() => setActiveCard(1)}
                    className="font-label text-xs text-[var(--mute)] hover:text-[var(--ink)] cursor-pointer"
                  >
                    ← Previous Card
                  </button>
                  <button
                    onClick={() => setActiveCard(3)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--brand)] text-white text-xs font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-xs"
                  >
                    <span>Proceed to Final Audit</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* CARD 3: Final Audit Challenge */}
            {activeCard === 3 && (
              <div className="space-y-6">
                <div>
                  <span className="font-label text-[10px] font-bold text-[var(--ok)] uppercase tracking-wider">
                    FINAL AUDIT // KNOWLEDGE CHECK
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mt-1">
                    Verify Your Understanding
                  </h2>
                </div>

                {!auditPassed ? (
                  <div className="space-y-4 max-w-xl">
                    <p className="text-sm font-semibold text-[var(--ink)]">
                      Question: What is the purpose of a Return-by Slip?
                    </p>

                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => {
                          setQuizAnswer(0);
                          setQuizError(false);
                        }}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs font-sans transition-all cursor-pointer ${
                          quizAnswer === 0
                            ? "border-red-300 bg-red-50 text-red-800"
                            : "border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--tint)]/50"
                        }`}
                      >
                        A monetary fine issued when a course is overdue.
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setQuizAnswer(1);
                          setQuizError(false);
                        }}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs font-sans transition-all cursor-pointer ${
                          quizAnswer === 1
                            ? "border-emerald-400 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-400"
                            : "border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--tint)]/50"
                        }`}
                      >
                        A set deadline for completing your training on schedule.
                      </button>
                    </div>

                    {quizError && (
                      <p className="text-xs text-red-600 flex items-center gap-1.5 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Please select the correct answer to complete this audit.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="p-6 rounded-xl border border-[var(--ok)] bg-emerald-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl">
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="font-display font-extrabold text-base text-emerald-900">
                        Audit Passed! (100% Score)
                      </div>
                      <p className="text-xs text-emerald-700 font-label">
                        +50 XP Credited • First Entry Stamp Unlocked
                      </p>
                    </div>

                    <div className="border-2 border-dashed border-[var(--ok)] text-[var(--ok)] font-label text-xs font-bold uppercase px-3 py-1 rounded bg-[var(--surface)] rotate-[-3deg]">
                      APPROVED
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t border-[var(--line)] flex items-center justify-between">
                  <button
                    onClick={() => setActiveCard(2)}
                    className="font-label text-xs text-[var(--mute)] hover:text-[var(--ink)] cursor-pointer"
                  >
                    ← Previous Card
                  </button>

                  {!auditPassed ? (
                    <button
                      onClick={handleAuditSubmit}
                      className="px-5 py-2.5 rounded-xl bg-[var(--ok)] text-white text-xs font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-xs"
                    >
                      Submit Audit Answer
                    </button>
                  ) : (
                    <Link
                      href="/archive/rewards"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--brand)] text-white text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-xs"
                    >
                      <span>Claim Certificate & Stamp</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}