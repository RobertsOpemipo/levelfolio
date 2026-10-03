"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Search,
} from "lucide-react";
import { ArchiveHeader } from "@/components/layout/ArchiveHeader";

export default function ShelfPage() {
  const [activeTab, setActiveTab] = useState<"assigned" | "catalog">("assigned");
  const [searchQuery, setSearchQuery] = useState("");

  const assignedFiles = [
    {
      id: "00000003-0000-0000-0000-000000000001",
      title: "Welcome to the Archive: Cardholder Induction",
      tag: "Mandatory",
      completedCards: 1,
      totalCards: 3,
      due: "Oct 8, 2026",
      daysLeft: 6,
      status: "In Progress",
    },
    {
      id: "00000003-0000-0000-0000-000000000002",
      title: "Annual Information Security Standards",
      tag: "Compliance",
      completedCards: 0,
      totalCards: 4,
      due: "Oct 15, 2026",
      daysLeft: 13,
      status: "Not Started",
    },
    {
      id: "00000003-0000-0000-0000-000000000003",
      title: "Data Subject Access Request (DSAR) Handling",
      tag: "Role Training",
      completedCards: 2,
      totalCards: 2,
      due: "Completed",
      daysLeft: 0,
      status: "Completed",
    },
  ];

  const catalogFiles = [
    {
      id: "cat-1",
      title: "Secure Code Review Fundamentals",
      tag: "Engineering",
      totalCards: 5,
      time: "20 mins",
      xp: 75,
    },
    {
      id: "cat-2",
      title: "Workplace Incident Reporting & Whistleblowing",
      tag: "General",
      totalCards: 3,
      time: "10 mins",
      xp: 40,
    },
  ];

  const filteredAssigned = assignedFiles.filter((f) =>
    f.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <ArchiveHeader />

      <main className="max-w-[1140px] mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-6">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
              My Shelf
            </h1>
            <p className="text-sm text-[var(--mute)] mt-1">
              Your assigned courses and certificates in one place.
            </p>
          </div>

          {/* Simple Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-[var(--surface)] border border-[var(--line)] rounded-xl">
            <button
              onClick={() => setActiveTab("assigned")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "assigned"
                  ? "bg-[var(--brand)] text-white shadow-xs"
                  : "text-[var(--mute)] hover:text-[var(--ink)]"
              }`}
            >
              Assigned ({assignedFiles.length})
            </button>
            <button
              onClick={() => setActiveTab("catalog")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "catalog"
                  ? "bg-[var(--brand)] text-white shadow-xs"
                  : "text-[var(--mute)] hover:text-[var(--ink)]"
              }`}
            >
              Course Catalog
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-[var(--mute)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-sans focus:outline-none focus:border-[var(--brand)] shadow-xs"
          />
        </div>

        {/* Tab 1: Assigned Courses */}
        {activeTab === "assigned" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssigned.map((file) => {
              const isDone = file.status === "Completed";
              const isUrgent = file.daysLeft > 0 && file.daysLeft <= 7;
              const progressPct = Math.round(
                (file.completedCards / file.totalCards) * 100
              );

              return (
                <div
                  key={file.id}
                  className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-5 hover:border-[var(--brand)]/60 transition-colors"
                >
                  <div className="space-y-3">
                    {/* Top Row: Tag & Status */}
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-label text-[10px] font-bold text-[var(--accent)] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded">
                        {file.tag}
                      </span>
                      {isDone ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3" /> Completed
                        </span>
                      ) : (
                        <span className="text-[11px] font-label text-[var(--mute)]">
                          {file.completedCards} of {file.totalCards} cards
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg font-bold text-[var(--ink)] leading-snug">
                      {file.title}
                    </h3>

                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-[var(--tint)] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isDone ? "bg-[var(--ok)]" : "bg-[var(--brand)]"
                        }`}
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer: Due Date & Action */}
                  <div className="pt-4 border-t border-[var(--line)]/70 flex items-center justify-between">
                    <div>
                      {isDone ? (
                        <span className="text-xs font-label text-[var(--ok)] font-bold">
                          Certified
                        </span>
                      ) : (
                        <div
                          className={`inline-flex items-center gap-1.5 text-xs font-label font-bold ${
                            isUrgent
                              ? "text-[var(--accent)]"
                              : "text-[var(--mute)]"
                          }`}
                        >
                          {isUrgent ? (
                            <AlertTriangle className="w-3.5 h-3.5" />
                          ) : (
                            <Clock className="w-3.5 h-3.5" />
                          )}
                          <span>Due {file.due}</span>
                        </div>
                      )}
                    </div>

                    <Link
                      href={
                        isDone
                          ? "/archive/rewards"
                          : `/archive/files/${file.id}`
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-[var(--brand)] text-white hover:opacity-90 active:scale-95 transition-all shadow-xs"
                    >
                      <span>{isDone ? "View Certificate" : "Continue"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Open Catalog */}
        {activeTab === "catalog" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogFiles.map((file) => (
              <div
                key={file.id}
                className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-label text-[10px] font-bold text-[var(--brand)] bg-[var(--tint)] px-2 py-0.5 rounded">
                      {file.tag}
                    </span>
                    <span className="text-[11px] font-label text-[var(--ok)] font-bold">
                      +{file.xp} XP
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[var(--ink)] leading-snug">
                    {file.title}
                  </h3>

                  <p className="text-xs text-[var(--mute)]">
                    {file.totalCards} cards · {file.time}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--line)]/70 flex justify-end">
                  <button
                    onClick={() => alert("Enrolled! Added to your shelf.")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--tint)] active:scale-95 transition-all cursor-pointer shadow-xs"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>Start Course</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}