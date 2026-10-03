"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Flame,
  Shield,
  Clock,
  CheckCircle2,
  Bell,
  Sparkles,
  RotateCcw,
  BookOpen,
  Users,
  Building,
  Check,
  TrendingUp,
  Award,
  Lock,
  Layers,
  ChevronRight,
} from "lucide-react";
import { LevelfolioLogo } from "@/components/brand/LevelfolioLogo";

export default function LandingPage() {
  // 1. Interactive Hero Simulation State
  const [heroStep, setHeroStep] = useState<1 | 2 | 3>(1);
  const [heroXp, setHeroXp] = useState(100);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizError, setQuizError] = useState(false);
  const [heroStamped, setHeroStamped] = useState(false);

  // 2. Interactive Role Switcher State
  const [activeRole, setActiveRole] = useState<"learner" | "manager" | "admin">("learner");
  const [nudgedUser, setNudgedUser] = useState(false);

  // 3. Interactive Rank Hierarchy Teaser
  const [selectedRankIdx, setSelectedRankIdx] = useState(0);
  const ranks = [
    { name: "Cardholder", level: "Levels 1–4", perk: "Access to core onboarding dossiers & index card files", xpReq: "0 – 250 XP" },
    { name: "Reader", level: "Levels 5–9", perk: "Unlocks cross-department elective modules and specializations", xpReq: "250 – 750 XP" },
    { name: "Cataloguer", level: "Levels 10–14", perk: "Can propose knowledge cards & earn team mentorship stamps", xpReq: "750 – 1,500 XP" },
    { name: "Curator", level: "Levels 15–19", perk: "Audit exemption credits & supervisor delegation permissions", xpReq: "1,500 – 3,000 XP" },
    { name: "Chief Archivist", level: "Levels 20+", perk: "Master compliance badge & executive archive clearance", xpReq: "3,000+ XP" },
  ];

  // 4. Interactive Certificate Studio State
  const [studentName, setStudentName] = useState("Amara Okafor");
  const [selectedCourse, setSelectedCourse] = useState("Data Privacy & Security Protocols");
  const [isCertStamped, setIsCertStamped] = useState(true);
  const [stampKey, setStampKey] = useState(0);

  const handleHeroAdvance = () => {
    if (heroStep === 1) {
      setHeroStep(2);
      setHeroXp(125);
    } else if (heroStep === 2) {
      if (selectedQuizOption !== 1) {
        setQuizError(true);
        return;
      }
      setQuizError(false);
      setHeroStep(3);
      setHeroXp(175);
      setHeroStamped(true);
    } else {
      // Reset demo
      setHeroStep(1);
      setHeroXp(100);
      setSelectedQuizOption(null);
      setQuizError(false);
      setHeroStamped(false);
    }
  };

  const triggerCertStamp = () => {
    setIsCertStamped(false);
    setTimeout(() => {
      setStampKey((k) => k + 1);
      setIsCertStamped(true);
    }, 40);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const elem = document.getElementById(targetId);
    if (!elem) return;
    const headerOffset = 80;
    const elementPosition = elem.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] overflow-x-hidden selection:bg-[var(--accent)] selection:text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--line)]">
        <div className="max-w-[1140px] mx-auto px-6 h-16 flex items-center justify-between">
          <LevelfolioLogo variant="folder-tab" iconSize={32} href="/" />

          <nav className="hidden md:flex items-center gap-7 text-xs font-label font-bold text-[var(--mute)]">
            <a
              href="#how-it-works"
              onClick={(e) => handleSmoothScroll(e, "how-it-works")}
              className="hover:text-[var(--ink)] transition-colors"
            >
              How It Works
            </a>
            <a
              href="#roles"
              onClick={(e) => handleSmoothScroll(e, "roles")}
              className="hover:text-[var(--ink)] transition-colors"
            >
              Three Personas
            </a>
            <a
              href="#ranks"
              onClick={(e) => handleSmoothScroll(e, "ranks")}
              className="hover:text-[var(--ink)] transition-colors"
            >
              Rank Hierarchy
            </a>
            <a
              href="#certificate-studio"
              onClick={(e) => handleSmoothScroll(e, "certificate-studio")}
              className="hover:text-[var(--ink)] transition-colors"
            >
              Certificate Studio
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/archive/reading-room"
              className="inline-flex items-center gap-2 font-sans font-bold text-xs h-10 px-4 rounded-xl bg-[var(--brand)] text-white hover:opacity-90 active:scale-95 shadow-xs transition-all"
            >
              <span>Explore Prototype</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1140px] mx-auto px-6 space-y-24 py-12 md:py-20">
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="font-label text-xs uppercase tracking-wider font-bold text-[var(--accent)]">
                The Quiet LMS // Gamified Corporate Archive
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-extrabold leading-[1.06] tracking-tight text-[var(--ink)]">
              Learn it.<br />
              File it.<br />
              <span className="text-[var(--accent)]">Level up.</span>
            </h1>

            <p className="text-[var(--mute)] text-base sm:text-lg font-sans leading-relaxed max-w-[48ch]">
              Training shouldn&apos;t feel like a corporate punishment. Levelfolio turns compliance and onboarding into an interactive personal archive your staff actually finishes on time.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/archive/reading-room"
                className="inline-flex items-center justify-center font-sans font-bold text-xs h-11 px-6 rounded-xl bg-[var(--brand)] text-white hover:opacity-90 active:scale-95 shadow-sm transition-all"
              >
                <span>Launch Reading Room</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Link>

              <a
                href="#how-it-works"
                onClick={(e) => handleSmoothScroll(e, "how-it-works")}
                className="inline-flex items-center justify-center font-sans font-bold text-xs h-11 px-5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--tint)]/50 transition-colors"
              >
                See How It Works ↓
              </a>
            </div>

            {/* Micro Feature Chips */}
            <div className="flex flex-wrap items-center gap-5 pt-6 border-t border-[var(--line)]/70 text-xs font-label text-[var(--mute)]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--ok)]" /> 2-minute index cards
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[var(--accent)]" /> Return-by slip alerts
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[var(--brand)]" /> Database tenant isolation
              </span>
            </div>
          </div>

          {/* INTERACTIVE HERO SIMULATION CARD */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-[var(--line)]/40 rounded-2xl transform rotate-2 translate-x-2 translate-y-3 -z-10" />

            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 sm:p-7 shadow-lg relative">
              {/* Header with Live Animated XP Meter */}
              <div className="space-y-3 pb-4 border-b border-[var(--line)]">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-label text-[10px] text-[var(--mute)] uppercase tracking-wider font-bold">
                      INTERACTIVE DEMO // TAP TO TEST
                    </span>
                    <h3 className="font-display font-bold text-lg text-[var(--ink)]">
                      Cardholder Induction
                    </h3>
                  </div>

                  <div className="text-right font-label">
                    <span className="text-xs font-bold text-[var(--brand)] block">
                      {heroXp} / 250 XP
                    </span>
                    <span className="text-[10px] text-[var(--accent)] flex items-center justify-end gap-1">
                      <Flame className="w-3 h-3 fill-current" /> 3-Day Streak
                    </span>
                  </div>
                </div>

                {/* Progress bar filling up */}
                <div className="space-y-1">
                  <div className="h-2 w-full bg-[var(--tint)] rounded-full overflow-hidden border border-[var(--line)]">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--brand)] to-[var(--ok)] rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${Math.round((heroXp / 250) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-label text-[var(--mute)]">
                    <span>Rank: Level 1 Cardholder</span>
                    <span>{250 - heroXp} XP to Level 2 (Reader)</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Interactive Card Body */}
              <div className="my-5 min-h-[175px] flex flex-col justify-between">
                {heroStep === 1 && (
                  <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--tint)]/40 space-y-2">
                    <div className="flex justify-between items-center font-label text-[10px] text-[var(--accent)] font-bold uppercase">
                      <span>CARD 01 // 2 MIN READ</span>
                      <span className="text-[var(--ok)]">+25 XP</span>
                    </div>
                    <h4 className="font-sans font-bold text-sm text-[var(--ink)]">
                      Lesson 1: The Return-by Slip Rule
                    </h4>
                    <p className="text-xs text-[var(--mute)] leading-relaxed">
                      Every task has a Return-by Slip. Completing your index cards on time keeps your company audit file 100% compliant and unlocks official stamps.
                    </p>
                  </div>
                )}

                {heroStep === 2 && (
                  <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--tint)]/40 space-y-2.5">
                    <div className="flex justify-between items-center font-label text-[10px] text-[var(--brand)] font-bold uppercase">
                      <span>CARD 02 // AUDIT CHECK</span>
                      <span className="text-[var(--ok)]">+50 XP</span>
                    </div>
                    <h4 className="font-sans font-bold text-xs text-[var(--ink)]">
                      What is the purpose of a Return-by Slip?
                    </h4>

                    <div className="space-y-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedQuizOption(0);
                          setQuizError(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs font-sans transition-all cursor-pointer ${
                          selectedQuizOption === 0
                            ? "bg-red-50 border-red-300 text-red-800"
                            : "bg-[var(--surface)] border-[var(--line)] hover:bg-[var(--tint)]"
                        }`}
                      >
                        A monetary fine for overdue work
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedQuizOption(1);
                          setQuizError(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs font-sans font-medium transition-all cursor-pointer ${
                          selectedQuizOption === 1
                            ? "bg-emerald-50 border-emerald-400 text-emerald-900 ring-1 ring-emerald-400 font-bold"
                            : "bg-[var(--surface)] border-[var(--line)] hover:bg-[var(--tint)]"
                        }`}
                      >
                        A clear completion deadline set by your company
                      </button>
                    </div>

                    {quizError && (
                      <p className="text-[11px] text-red-600 font-sans font-medium">
                        Select the correct answer to complete the audit.
                      </p>
                    )}
                  </div>
                )}

                {heroStep === 3 && (
                  <div className="p-4 rounded-xl border border-[var(--ok)] bg-emerald-50/50 text-center space-y-1.5">
                    <span className="font-label text-[10px] text-emerald-800 font-bold uppercase">
                      FINAL AUDIT VERIFIED (100%)
                    </span>
                    <h4 className="font-display font-bold text-base text-emerald-900">
                      Index Card Completed & Filed!
                    </h4>
                    <p className="text-xs text-[var(--mute)]">
                      +50 XP Credited. First Entry Stamp unlocked in your personal dossier.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between">
                <span className="font-label text-xs text-[var(--mute)]">
                  Step {heroStep} of 3
                </span>
                <button
                  type="button"
                  onClick={handleHeroAdvance}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--brand)] text-white font-sans text-xs font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-xs"
                >
                  {heroStep === 1 && (
                    <>
                      <span>Complete Card 01</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                  {heroStep === 2 && (
                    <>
                      <span>Submit Answer</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                  {heroStep === 3 && (
                    <>
                      <span>Reset Demo</span>
                      <RotateCcw className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {/* Physical Rubber Stamp */}
              {heroStamped && (
                <div className="absolute bottom-16 right-6 border-2 border-dashed border-[var(--ok)] text-[var(--ok)] font-label font-bold text-xs uppercase px-3 py-1 rounded bg-[var(--surface)] shadow-md select-none animate-stamp">
                  APPROVED &amp; FILED
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 3-STEP WALKTHROUGH */}
        <section id="how-it-works" className="py-8 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-label text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
              HOW IT WORKS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--ink)] mt-1.5 mb-3">
              How training gets done in 3 steps.
            </h2>
            <p className="text-[var(--mute)] text-sm font-sans">
              No endless video seminars or boring slideware. Simple, bite-sized tasks that respect employee working hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 sm:p-7 space-y-3.5 shadow-xs hover:border-[var(--brand)] transition-colors">
              <div className="flex justify-between items-center">
                <span className="font-display text-3xl font-extrabold text-[var(--line)]">01</span>
                <div className="w-9 h-9 rounded-xl bg-[var(--tint)] text-[var(--brand)] flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-display font-bold text-lg text-[var(--ink)]">
                Bite-Sized Index Cards
              </h3>
              <p className="text-xs text-[var(--mute)] leading-relaxed">
                Courses are broken into self-contained 2-to-3 minute reading cards and video briefs with captions.
              </p>
            </div>

            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 sm:p-7 space-y-3.5 shadow-xs hover:border-[var(--brand)] transition-colors">
              <div className="flex justify-between items-center">
                <span className="font-display text-3xl font-extrabold text-[var(--line)]">02</span>
                <div className="w-9 h-9 rounded-xl bg-[var(--tint)] text-[var(--brand)] flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[var(--accent)]" />
                </div>
              </div>
              <h3 className="font-display font-bold text-lg text-[var(--ink)]">
                Clear Return-by Slips
              </h3>
              <p className="text-xs text-[var(--mute)] leading-relaxed">
                Every assignment displays an unmistakable due date and remaining day countdown so deadlines never sneak up.
              </p>
            </div>

            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 sm:p-7 space-y-3.5 shadow-xs hover:border-[var(--brand)] transition-colors">
              <div className="flex justify-between items-center">
                <span className="font-display text-3xl font-extrabold text-[var(--line)]">03</span>
                <div className="w-9 h-9 rounded-xl bg-[var(--tint)] text-[var(--ok)] flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-display font-bold text-lg text-[var(--ink)]">
                Verified Certificates
              </h3>
              <p className="text-xs text-[var(--mute)] leading-relaxed">
                Passing audits issues an immutable serial certificate recorded to the company ledger.
              </p>
            </div>
          </div>
        </section>

        {/* THREE PERSONAS SHOWCASE */}
        <section id="roles" className="py-8 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-label text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
              EXPERIENCE THE ROLES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--ink)] mt-1.5 mb-3">
              One system. Three tailored experiences.
            </h2>
            <p className="text-[var(--mute)] text-sm font-sans">
              Switch below to preview what the learner, manager, and administrator see in Levelfolio.
            </p>
          </div>

          {/* Role Tabs */}
          <div className="flex justify-center gap-2 mb-8">
            <button
              type="button"
              onClick={() => setActiveRole("learner")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                activeRole === "learner"
                  ? "bg-[var(--brand)] text-white shadow-xs"
                  : "bg-[var(--surface)] text-[var(--mute)] border border-[var(--line)] hover:text-[var(--ink)]"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Amara (Learner)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveRole("manager")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                activeRole === "manager"
                  ? "bg-[var(--brand)] text-white shadow-xs"
                  : "bg-[var(--surface)] text-[var(--mute)] border border-[var(--line)] hover:text-[var(--ink)]"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Tunde (Manager)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveRole("admin")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                activeRole === "admin"
                  ? "bg-[var(--brand)] text-white shadow-xs"
                  : "bg-[var(--surface)] text-[var(--mute)] border border-[var(--line)] hover:text-[var(--ink)]"
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Ngozi (Admin)</span>
            </button>
          </div>

          {/* Interactive Role Card */}
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 sm:p-10 shadow-xs">
            {activeRole === "learner" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-3.5">
                  <span className="font-label text-[10px] font-bold text-[var(--ok)] uppercase">
                    CARDHOLDER READING ROOM
                  </span>
                  <h3 className="font-display text-2xl font-bold">
                    Learners always know what to do next.
                  </h3>
                  <p className="text-xs text-[var(--mute)] leading-relaxed">
                    No searching through shared network drives. Clear return-by slips, an induction questline trail, and progress points keep cardholders motivated.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/archive/reading-room"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand)] hover:underline"
                    >
                      <span>Open Live Reading Room</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="bg-[var(--tint)]/40 rounded-xl p-5 border border-[var(--line)] space-y-3 font-sans">
                  <div className="bg-[var(--surface)] p-3.5 rounded-xl border border-[var(--line)] shadow-xs">
                    <div className="flex justify-between text-xs font-label mb-1">
                      <span className="font-bold text-[var(--ink)]">Cardholder Induction Protocols</span>
                      <span className="text-[var(--accent)] font-bold">Due in 6 days</span>
                    </div>
                    <div className="text-[11px] text-[var(--mute)]">Progress: 2 of 3 Index Cards Finished</div>
                  </div>
                </div>
              </div>
            )}

            {activeRole === "manager" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-3.5">
                  <span className="font-label text-[10px] font-bold text-[var(--accent)] uppercase">
                    SUPERVISOR DOCKET
                  </span>
                  <h3 className="font-display text-2xl font-bold">
                    Team oversight + Personal certification.
                  </h3>
                  <p className="text-xs text-[var(--mute)] leading-relaxed">
                    Managers track their direct reports, send instant nudges, grant deadline extensions, and complete their own supervisory compliance files in one place.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/manager/docket"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand)] hover:underline"
                    >
                      <span>Open Live Manager Docket</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="bg-[var(--tint)]/40 rounded-xl p-5 border border-[var(--line)] space-y-2.5">
                  <div className="bg-[var(--surface)] p-3.5 rounded-xl border border-[var(--line)] shadow-xs flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[var(--ink)]">Sarah Jenkins</div>
                      <div className="text-[10px] text-[var(--accent)] font-label font-bold">Overdue by 4 days</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNudgedUser(true)}
                      className={`px-3 py-1.5 rounded-lg border font-sans text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        nudgedUser
                          ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                          : "border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--tint)]"
                      }`}
                    >
                      {nudgedUser ? (
                        <>
                          <Check className="w-3 h-3 text-[var(--ok)]" /> Nudged!
                        </>
                      ) : (
                        <>
                          <Bell className="w-3 h-3 text-[var(--accent)]" /> Send Nudge
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeRole === "admin" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-3.5">
                  <span className="font-label text-[10px] font-bold text-[var(--brand)] uppercase">
                    COMPANY GOVERNANCE
                  </span>
                  <h3 className="font-display text-2xl font-bold">
                    Zero-hassle regulatory compliance.
                  </h3>
                  <p className="text-xs text-[var(--mute)] leading-relaxed">
                    Export unalterable statutory CSV audit trails, create automatic course enrollment directives, and verify database tenant isolation in real time.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/admin/workspace"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand)] hover:underline"
                    >
                      <span>Open Live Admin Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="bg-[var(--tint)]/40 rounded-xl p-5 border border-[var(--line)] space-y-2 text-xs font-label">
                  <div className="bg-[var(--surface)] p-3 rounded-lg border border-[var(--line)] flex justify-between">
                    <span className="text-[var(--mute)]">Organization Status</span>
                    <span className="text-[var(--ok)] font-bold">79% Staff Certified</span>
                  </div>
                  <div className="bg-[var(--surface)] p-3 rounded-lg border border-[var(--line)] flex justify-between">
                    <span className="text-[var(--mute)]">Security Ledger</span>
                    <span className="text-emerald-700 font-bold">Immutable PostgreSQL 16</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* GAMIFIED ARCHIVAL RANK HIERARCHY */}
        <section id="ranks" className="py-8 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-label text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand)]">
              CAREER REWARDS &amp; GAMIFICATION
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--ink)] mt-1.5 mb-3">
              The 5 Archival Ranks
            </h2>
            <p className="text-[var(--mute)] text-sm font-sans">
              Employees level up from Cardholder to Chief Archivist as they complete compliance files and skill challenges.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            {ranks.map((r, idx) => (
              <button
                key={r.name}
                type="button"
                onClick={() => setSelectedRankIdx(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedRankIdx === idx
                    ? "bg-[var(--brand)] text-white border-[var(--brand)] shadow-xs ring-2 ring-[var(--brand)]/20"
                    : "bg-[var(--surface)] border-[var(--line)] hover:border-[var(--brand)]/50"
                }`}
              >
                <div className={`font-display font-bold text-sm ${selectedRankIdx === idx ? "text-white" : "text-[var(--ink)]"}`}>
                  {r.name}
                </div>
                <div className={`text-[10px] font-label mt-0.5 ${selectedRankIdx === idx ? "text-white/80" : "text-[var(--mute)]"}`}>
                  {r.level}
                </div>
              </button>
            ))}
          </div>

          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-label text-[10px] font-bold text-[var(--accent)] uppercase">
                RANK BENEFIT // {ranks[selectedRankIdx].name.toUpperCase()}
              </span>
              <p className="text-sm font-sans font-bold text-[var(--ink)]">
                {ranks[selectedRankIdx].perk}
              </p>
            </div>
            <div className="font-label text-xs font-bold text-[var(--brand)] bg-[var(--tint)] px-3 py-1.5 rounded-lg border border-[var(--line)] shrink-0 self-start sm:self-auto">
              XP Range: {ranks[selectedRankIdx].xpReq}
            </div>
          </div>
        </section>

        {/* LIVE CERTIFICATE STUDIO */}
        <section id="certificate-studio" className="py-8 scroll-mt-20 text-center">
          <span className="font-label text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
            TRY IT YOURSELF
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--ink)] mt-1.5 mb-3">
            Certificate Studio
          </h2>
          <p className="text-[var(--mute)] text-sm font-sans max-w-md mx-auto mb-8">
            Type your name to preview the official serialized completion certificate earned upon finishing a file.
          </p>

          <div className="max-w-md mx-auto mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <div>
              <label className="block text-[10px] font-label uppercase text-[var(--mute)] mb-1 font-bold">
                Cardholder Name:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter name"
                className="w-full px-3 py-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] font-sans text-xs focus:outline-none focus:border-[var(--brand)] shadow-xs"
              />
            </div>

            <div>
              <label className="block text-[10px] font-label uppercase text-[var(--mute)] mb-1 font-bold">
                Select Course Topic:
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] font-sans text-xs focus:outline-none focus:border-[var(--brand)] shadow-xs"
              >
                <option value="Data Privacy & Security Protocols">Data Privacy & Security</option>
                <option value="Information Classification 101">Information Classification</option>
                <option value="Company Culture & Ethics">Company Culture & Ethics</option>
              </select>
            </div>
          </div>

          {/* Certificate Paper Artifact */}
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-8 sm:p-12 text-center relative max-w-[540px] mx-auto shadow-md outline outline-8 outline-double outline-[var(--line)] -outline-offset-[16px]">
            <span className="font-label text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              Certificate of Completion
            </span>

            <div className="font-display text-2xl sm:text-3xl font-extrabold my-3 text-[var(--ink)]">
              {selectedCourse}
            </div>

            <p className="text-[var(--mute)] text-xs mb-1">
              Officially issued and recorded for:
            </p>
            <div className="font-display text-2xl font-bold text-[var(--brand)] my-2">
              {studentName.trim() || "Cardholder Name"}
            </div>

            <div className="font-label text-xs text-[var(--mute)] mt-3">
              SERIAL: <b>LF-2026-LIVE</b> · VALIDITY: 12 MONTHS
            </div>

            {isCertStamped && (
              <div
                key={stampKey}
                className="inline-block mt-7 border-4 border-double border-[var(--ok)] text-[var(--ok)] font-label text-xs font-bold uppercase px-4 py-1.5 rounded shadow-xs select-none animate-stamp"
              >
                APPROVED &amp; VERIFIED
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={triggerCertStamp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--line)] font-sans text-xs font-bold text-[var(--ink)] hover:bg-[var(--tint)] transition-colors cursor-pointer shadow-xs active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" /> Re-Stamp Seal
            </button>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="py-8">
          <div className="text-center bg-[var(--brand)] text-white rounded-3xl p-10 sm:p-14 shadow-lg relative overflow-hidden space-y-4 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold leading-tight">
              Ready to explore the Archive?
            </h2>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
              Test all three personas directly in the browser—no signup or Docker required.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link
                href="/archive/reading-room"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[var(--brand)] font-sans font-bold text-xs hover:bg-slate-100 shadow-xs transition-colors"
              >
                <span>Launch Reading Room</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/manager/docket"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/30 text-white font-sans font-bold text-xs hover:bg-white/10 transition-colors"
              >
                <span>Supervisor Docket</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[var(--line)] py-10 text-xs font-label text-[var(--mute)]">
        <div className="max-w-[1140px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <LevelfolioLogo variant="folder-tab" iconSize={26} href="/" />
          <div>The Quiet LMS · Built for Modern Teams</div>
          <div className="flex gap-4">
            <Link href="/archive/reading-room" className="hover:text-[var(--ink)]">Reading Room</Link>
            <Link href="/archive/shelf" className="hover:text-[var(--ink)]">Shelf</Link>
            <Link href="/manager/docket" className="hover:text-[var(--ink)]">Manager</Link>
            <Link href="/admin/workspace" className="hover:text-[var(--ink)]">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}