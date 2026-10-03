"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Share2,
  Check,
  Shield,
  TrendingUp,
} from "lucide-react";
import { ArchiveHeader } from "@/components/layout/ArchiveHeader";

export default function RewardsPage() {
  const [copied, setCopied] = useState(false);

  const handleCopySerial = () => {
    navigator.clipboard.writeText("LF-2026-0001");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rankTiers = [
    { rank: "Cardholder", levels: "Levels 1–4", isCurrent: true },
    { rank: "Reader", levels: "Levels 5–9", isCurrent: false },
    { rank: "Cataloguer", levels: "Levels 10–14", isCurrent: false },
    { rank: "Curator", levels: "Levels 15–19", isCurrent: false },
    { rank: "Chief Archivist", levels: "Levels 20+", isCurrent: false },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <ArchiveHeader />

      <main className="max-w-[1080px] mx-auto px-6 py-8 space-y-10">
        {/* Breadcrumb */}
        <Link
          href="/archive/reading-room"
          className="inline-flex items-center gap-1.5 font-label text-xs font-bold text-[var(--mute)] hover:text-[var(--ink)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Reading Room</span>
        </Link>

        {/* Certificate Section */}
        <section className="text-center space-y-4">
          <div>
            <span className="font-label text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
              OFFICIAL CERTIFICATION
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight mt-1">
              Course Completed & Stamped
            </h1>
            <p className="text-xs text-[var(--mute)] max-w-md mx-auto mt-1">
              Your completion record has been verified and permanently added to your file.
            </p>
          </div>

          {/* Authentic Paper Certificate */}
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-8 sm:p-12 text-center relative max-w-[580px] mx-auto shadow-md outline outline-8 outline-double outline-[var(--line)] -outline-offset-[16px]">
            <span className="font-label text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
              Certificate of Completion
            </span>

            <div className="font-display text-2xl sm:text-3xl font-extrabold my-3 text-[var(--ink)]">
              Cardholder Induction & Protocols
            </div>

            <p className="text-xs text-[var(--mute)] mb-1">
              Officially issued to:
            </p>
            <div className="font-display text-xl font-bold text-[var(--brand)] mb-4">
              Amara Okafor
            </div>

            <div className="font-label text-xs text-[var(--mute)] space-y-0.5 border-t border-[var(--line)] pt-4 max-w-xs mx-auto">
              <div>SERIAL: <b>LF-2026-0001</b></div>
              <div>VALIDITY: <b>12 MONTHS (EXPIRES OCT 2027)</b></div>
            </div>

            {/* Embossed Rubber Stamp */}
            <div className="inline-block mt-8 border-4 border-double border-[var(--ok)] text-[var(--ok)] font-label text-xs font-bold uppercase px-4 py-1.5 rounded shadow-xs select-none animate-stamp">
              APPROVED & VERIFIED
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => alert("Downloading verified PDF certificate...")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--brand)] text-white text-xs font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handleCopySerial}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] text-xs font-bold hover:bg-[var(--tint)] transition-all cursor-pointer shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[var(--ok)]" />
                  <span>Serial Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Copy Serial (LF-2026-0001)</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* Rank Ladder Progression */}
        <section className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-xs">
          <div>
            <span className="font-label text-[10px] font-bold uppercase tracking-wider text-[var(--mute)]">
              CAREER LADDER
            </span>
            <h2 className="font-display text-xl font-bold text-[var(--ink)] mt-0.5">
              Archive Rank Hierarchy
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5 justify-center pt-2">
            {rankTiers.map((tier) => (
              <div
                key={tier.rank}
                className={`px-4 py-2.5 rounded-xl border font-label text-xs transition-all ${
                  tier.isCurrent
                    ? "bg-[var(--brand)] text-white border-[var(--brand)] font-bold shadow-xs ring-2 ring-[var(--brand)]/20"
                    : "bg-[var(--surface)] text-[var(--mute)] border-[var(--line)]"
                }`}
              >
                <div>{tier.rank}</div>
                <div className={`text-[10px] mt-0.5 ${tier.isCurrent ? "text-white/80" : "text-[var(--mute)]"}`}>
                  {tier.levels}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-[var(--mute)] pt-2">
            Complete your next compliance task to advance toward <b>Reader (Level 2)</b>.
          </p>
        </section>
      </main>
    </div>
  );
}