"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Bell,
  Download,
  Search,
  Check,
  Plus,
  Calendar,
  X,
  FileText,
  Flame,
  ChevronRight,
  Send,
  Award,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { ArchiveHeader } from "@/components/layout/ArchiveHeader";
import { usePersona } from "@/components/layout/PersonaSwitcher";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  course: string;
  completedCards: number;
  totalCards: number;
  dueDate: string;
  daysLeft: number;
  status: "Completed" | "In Progress" | "Overdue";
  nudged: boolean;
  streak: number;
  lastActive: string;
}

export default function ManagerDocketPage() {
  const { currentPersona } = usePersona();
  const [filter, setFilter] = useState<"all" | "overdue" | "in_progress" | "completed">("all");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals & Drawers
  const [inspectMember, setInspectMember] = useState<TeamMember | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New assignment form state
  const [assignMemberId, setAssignMemberId] = useState("mem-1");
  const [assignCourse, setAssignCourse] = useState("Annual Information Security Standards");
  const [assignDueDate, setAssignDueDate] = useState("Oct 20, 2026");

  // Tunde's Own Manager Certification
  const [managerCert, setManagerCert] = useState({
    title: "Executive Leadership & Data Breach Escalation Standards",
    completedCards: 1,
    totalCards: 3,
    dueDate: "Oct 18, 2026",
    daysLeft: 16,
    status: "In Progress",
    serial: "MGR-CERT-2026-04",
  });

  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: "mem-1",
      name: "Amara Okafor",
      email: "amara@acme.test",
      role: "Security Analyst",
      course: "Cardholder Induction Protocols",
      completedCards: 2,
      totalCards: 3,
      dueDate: "Oct 8, 2026",
      daysLeft: 6,
      status: "In Progress",
      nudged: false,
      streak: 3,
      lastActive: "Today at 08:14 AM",
    },
    {
      id: "mem-2",
      name: "David Chen",
      email: "david@acme.test",
      role: "Compliance Associate",
      course: "Cardholder Induction Protocols",
      completedCards: 3,
      totalCards: 3,
      dueDate: "Oct 2, 2026",
      daysLeft: 0,
      status: "Completed",
      nudged: false,
      streak: 5,
      lastActive: "Yesterday",
    },
    {
      id: "mem-3",
      name: "Sarah Jenkins",
      email: "sarah@acme.test",
      role: "Risk Officer",
      course: "Annual Security Standards",
      completedCards: 1,
      totalCards: 4,
      dueDate: "Sep 28, 2026",
      daysLeft: -4,
      status: "Overdue",
      nudged: false,
      streak: 0,
      lastActive: "4 days ago",
    },
    {
      id: "mem-4",
      name: "Marcus Vance",
      email: "marcus@acme.test",
      role: "Operations Specialist",
      course: "Data Privacy & Subject Access",
      completedCards: 0,
      totalCards: 3,
      dueDate: "Oct 15, 2026",
      daysLeft: 13,
      status: "In Progress",
      nudged: false,
      streak: 1,
      lastActive: "3 days ago",
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleNudgeSingle = (id: string, name: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, nudged: true } : m))
    );
    showToast(`Reminder sent to ${name}!`);
  };

  const handleBulkNudge = () => {
    setMembers((prev) =>
      prev.map((m) => (selectedIds.includes(m.id) ? { ...m, nudged: true } : m))
    );
    showToast(`Reminders sent to ${selectedIds.length} team members!`);
    setSelectedIds([]);
  };

  const handleExtendDeadline = (id: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, dueDate: "Oct 12, 2026", daysLeft: 10, status: "In Progress" }
          : m
      )
    );
    if (inspectMember && inspectMember.id === id) {
      setInspectMember((prev) =>
        prev ? { ...prev, dueDate: "Oct 12, 2026", daysLeft: 10, status: "In Progress" } : null
      );
    }
    showToast("Deadline extended by 7 days.");
  };

  const handleAssignCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const target = members.find((m) => m.id === assignMemberId);
    if (!target) return;

    setMembers((prev) =>
      prev.map((m) =>
        m.id === assignMemberId
          ? {
              ...m,
              course: assignCourse,
              completedCards: 0,
              totalCards: 3,
              dueDate: assignDueDate,
              daysLeft: 14,
              status: "In Progress",
              nudged: false,
            }
          : m
      )
    );
    setIsAssignModalOpen(false);
    showToast(`Assigned "${assignCourse}" to ${target.name}.`);
  };

  const handleExportCSV = () => {
    const headers = "Name,Email,Role,Course,Progress,Status,Due Date,Streak\n";
    const rows = members
      .map(
        (m) =>
          `"${m.name}","${m.email}","${m.role}","${m.course}","${m.completedCards}/${m.totalCards} Cards","${m.status}","${m.dueDate}","${m.streak} Days"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `team-compliance-report-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === members.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(members.map((m) => m.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.course.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === "overdue") return m.status === "Overdue";
    if (filter === "in_progress") return m.status === "In Progress";
    if (filter === "completed") return m.status === "Completed";
    return true;
  });

  const completedCount = members.filter((m) => m.status === "Completed").length;
  const overdueCount = members.filter((m) => m.status === "Overdue").length;
  const completionPercentage = Math.round((completedCount / members.length) * 100);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] pb-28">
      <ArchiveHeader />

      <main className="max-w-[1140px] mx-auto px-6 py-8 space-y-8">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-emerald-900 text-white px-4 py-3 rounded-xl shadow-lg border border-emerald-700 flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-sans font-bold">{toastMessage}</span>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-label text-[11px] font-bold text-[var(--brand)] uppercase tracking-wider">
                SUPERVISOR DOCKET // {currentPersona.name.toUpperCase()}
              </span>
              <span className="text-[var(--mute)]">•</span>
              <span className="text-xs text-[var(--mute)]">Security Operations Department</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
              Supervisor Oversight &amp; Compliance
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
            <button
              onClick={() => setIsAssignModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--brand)] text-white text-xs font-bold hover:opacity-90 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Assign Return Slip</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold hover:bg-[var(--tint)] transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-[var(--brand)]" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* SECTION 1: TUNDE'S OWN MANDATORY SUPERVISOR CERTIFICATION */}
        <section className="bg-[var(--surface)] border-2 border-[var(--brand)]/30 rounded-2xl p-6 shadow-xs relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 font-label text-[10px] font-bold text-[var(--brand)] bg-[var(--tint)] px-2.5 py-0.5 rounded border border-[var(--line)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--brand)]" />
                  YOUR PERSONAL CERTIFICATION (REQUIRED FOR SUPERVISORS)
                </span>
                <span className="text-xs font-label text-[var(--mute)]">
                  {managerCert.serial}
                </span>
              </div>

              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[var(--ink)]">
                {managerCert.title}
              </h2>

              <p className="text-xs text-[var(--mute)] leading-relaxed">
                As Department Supervisor, you are statutory-bound to complete this briefing before your team&apos;s audit review window closes.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-label pt-1">
                <div className="flex items-center gap-1 text-[var(--accent)] font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>DUE: {managerCert.dueDate} ({managerCert.daysLeft} days remaining)</span>
                </div>
                <div className="text-[var(--mute)]">
                  Progress: <b>{managerCert.completedCards} of {managerCert.totalCards} Index Cards Finished</b>
                </div>
              </div>
            </div>

            {/* Action to complete his own course */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 border-t lg:border-t-0 lg:border-l border-[var(--line)] pt-4 lg:pt-0 lg:pl-6 shrink-0">
              <div className="text-left lg:text-right font-label text-xs">
                <span className="text-[var(--mute)] block text-[10px]">YOUR STATUS</span>
                <span className="font-bold text-[var(--accent)]">Card 2 Pending Final Audit</span>
              </div>

              <Link
                href="/archive/files/00000003-0000-0000-0000-000000000001"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--brand)] text-white text-xs font-bold hover:opacity-90 active:scale-95 shadow-xs transition-all"
              >
                <span>Continue Your Certification</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 2: TEAM OVERSIGHT SCORECARD */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs space-y-2">
            <span className="font-label text-[10px] font-bold text-[var(--mute)] uppercase tracking-wider">
              TEAM COMPLETION
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-display text-3xl font-extrabold text-[var(--ink)]">
                {completionPercentage}%
              </span>
              <span className="text-xs font-label text-[var(--mute)]">
                {completedCount} of {members.length} Certified
              </span>
            </div>
            <div className="h-2 w-full bg-[var(--tint)] rounded-full overflow-hidden border border-[var(--line)] mt-2">
              <div
                className="h-full bg-[var(--ok)] rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-[11px] text-[var(--mute)] pt-1">
              3 team members are currently on track.
            </p>
          </div>

          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs space-y-2">
            <span className="font-label text-[10px] font-bold text-[var(--mute)] uppercase tracking-wider">
              TEAM OVERDUE SLIPS
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-display text-3xl font-extrabold text-[var(--accent)]">
                {overdueCount}
              </span>
              <span className="text-xs font-label text-[var(--accent)] font-bold">
                Action Required
              </span>
            </div>
            <div className="h-2 w-full bg-[var(--tint)] rounded-full overflow-hidden border border-[var(--line)] mt-2">
              <div
                className="h-full bg-[var(--accent)] rounded-full"
                style={{ width: `${(overdueCount / members.length) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-[var(--mute)] pt-1">
              Sarah Jenkins is overdue on Annual Security Standards.
            </p>
          </div>

          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs space-y-2">
            <span className="font-label text-[10px] font-bold text-[var(--mute)] uppercase tracking-wider">
              TEAM STUDY MOMENTUM
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-display text-3xl font-extrabold text-[var(--brand)] flex items-center gap-1">
                <Flame className="w-6 h-6 text-[var(--accent)] fill-current" /> 4 Active
              </span>
              <span className="text-xs font-label text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Healthy
              </span>
            </div>
            <p className="text-[11px] text-[var(--mute)] pt-3">
              Average team activity: 12 minutes per daily index card.
            </p>
          </div>
        </div>

        {/* SECTION 3: TEAM MEMBERS ROSTER & DIRECT NUDGES */}
        <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-[var(--mute)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search staff, course, or role..."
                className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-[var(--line)] bg-[var(--bg)] text-xs font-sans focus:outline-none focus:border-[var(--brand)] shadow-xs"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {selectedIds.length > 0 && (
                <button
                  onClick={handleBulkNudge}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--accent)] text-white text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-xs cursor-pointer animate-in fade-in"
                >
                  <Send className="w-3 h-3" />
                  <span>Nudge {selectedIds.length} Selected</span>
                </button>
              )}

              <div className="flex items-center gap-1 p-1 bg-[var(--bg)] border border-[var(--line)] rounded-xl">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    filter === "all" ? "bg-[var(--brand)] text-white shadow-xs" : "text-[var(--mute)]"
                  }`}
                >
                  All ({members.length})
                </button>
                <button
                  onClick={() => setFilter("overdue")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    filter === "overdue" ? "bg-[var(--brand)] text-white shadow-xs" : "text-[var(--mute)]"
                  }`}
                >
                  Overdue ({overdueCount})
                </button>
                <button
                  onClick={() => setFilter("in_progress")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    filter === "in_progress" ? "bg-[var(--brand)] text-white shadow-xs" : "text-[var(--mute)]"
                  }`}
                >
                  In Progress ({members.filter((m) => m.status === "In Progress").length})
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    filter === "completed" ? "bg-[var(--brand)] text-white shadow-xs" : "text-[var(--mute)]"
                  }`}
                >
                  Certified ({completedCount})
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--line)] text-[10px] font-label font-bold uppercase text-[var(--mute)]">
                  <th className="py-3 px-3 w-8">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === members.length && members.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-[var(--line)] cursor-pointer"
                    />
                  </th>
                  <th className="py-3 px-4">Cardholder</th>
                  <th className="py-3 px-4">Assigned Course</th>
                  <th className="py-3 px-4">Progress</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]/60 text-xs font-sans">
                {filteredMembers.map((member) => {
                  const isChecked = selectedIds.includes(member.id);
                  const progressPct = Math.round((member.completedCards / member.totalCards) * 100);

                  return (
                    <tr
                      key={member.id}
                      className={`hover:bg-[var(--tint)]/30 transition-colors ${
                        isChecked ? "bg-[var(--tint)]/40" : ""
                      }`}
                    >
                      <td className="py-4 px-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectOne(member.id)}
                          className="rounded border-[var(--line)] cursor-pointer"
                        />
                      </td>

                      <td className="py-4 px-4">
                        <button
                          onClick={() => setInspectMember(member)}
                          className="text-left group cursor-pointer"
                        >
                          <div className="font-bold text-[var(--ink)] group-hover:text-[var(--brand)] flex items-center gap-1.5">
                            <span>{member.name}</span>
                            <span className="text-[10px] font-label text-[var(--mute)] font-normal">
                              🔥 {member.streak}d
                            </span>
                          </div>
                          <div className="text-[11px] text-[var(--mute)]">{member.role}</div>
                        </button>
                      </td>

                      <td className="py-4 px-4 max-w-[220px]">
                        <div className="truncate font-medium text-[var(--ink)]">{member.course}</div>
                        <div className="text-[10px] text-[var(--mute)] font-label">Active file</div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-label text-[11px] text-[var(--mute)] font-bold">
                            {member.completedCards}/{member.totalCards}
                          </span>
                          <div className="w-16 h-1.5 bg-[var(--tint)] rounded-full overflow-hidden border border-[var(--line)]">
                            <div
                              className={`h-full rounded-full transition-all ${
                                member.status === "Completed" ? "bg-[var(--ok)]" : "bg-[var(--brand)]"
                              }`}
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-label text-xs">{member.dueDate}</div>
                        {member.status === "Overdue" && (
                          <div className="text-[10px] font-bold text-[var(--accent)] font-label">
                            {Math.abs(member.daysLeft)} days overdue
                          </div>
                        )}
                        {member.status === "In Progress" && member.daysLeft <= 7 && (
                          <div className="text-[10px] font-bold text-[var(--accent)] font-label">
                            Due in {member.daysLeft} days
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        {member.status === "Completed" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold font-label text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3" /> Certified
                          </span>
                        )}
                        {member.status === "In Progress" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold font-label text-[var(--brand)] bg-[var(--tint)] border border-[var(--line)] px-2 py-0.5 rounded">
                            In Progress
                          </span>
                        )}
                        {member.status === "Overdue" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold font-label text-red-800 bg-red-50 border border-red-300 px-2 py-0.5 rounded">
                            <AlertTriangle className="w-3 h-3" /> Overdue
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {member.status === "Completed" ? (
                            <span className="text-[11px] font-label text-[var(--mute)]">Certified</span>
                          ) : member.nudged ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--ok)] font-sans">
                              <Check className="w-3.5 h-3.5" /> Nudged!
                            </span>
                          ) : (
                            <button
                              onClick={() => handleNudgeSingle(member.id, member.name)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] font-bold text-xs hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95 transition-all cursor-pointer shadow-xs"
                            >
                              <Bell className="w-3 h-3" />
                              <span>Nudge</span>
                            </button>
                          )}

                          <button
                            onClick={() => setInspectMember(member)}
                            className="p-1 rounded-lg text-[var(--mute)] hover:text-[var(--ink)] hover:bg-[var(--tint)] cursor-pointer"
                            title="Inspect Details"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL: Assign Return Slip */}
        {isAssignModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-xl space-y-4 animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center pb-2 border-b border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[var(--brand)]" />
                  <h3 className="font-display font-bold text-lg text-[var(--ink)]">
                    Assign Return Slip
                  </h3>
                </div>
                <button
                  onClick={() => setIsAssignModalOpen(false)}
                  className="text-[var(--mute)] hover:text-[var(--ink)] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAssignCourse} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-[var(--ink)] mb-1">
                    Select Team Member:
                  </label>
                  <select
                    value={assignMemberId}
                    onChange={(e) => setAssignMemberId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--line)] bg-[var(--bg)] font-sans focus:outline-none focus:border-[var(--brand)]"
                  >
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[var(--ink)] mb-1">
                    Select Course File:
                  </label>
                  <select
                    value={assignCourse}
                    onChange={(e) => setAssignCourse(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--line)] bg-[var(--bg)] font-sans focus:outline-none focus:border-[var(--brand)]"
                  >
                    <option value="Cardholder Induction Protocols">Cardholder Induction Protocols</option>
                    <option value="Annual Information Security Standards">Annual Information Security Standards</option>
                    <option value="Data Privacy & Subject Access Requests">Data Privacy & Subject Access Requests</option>
                    <option value="Secure Code Review Fundamentals">Secure Code Review Fundamentals</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[var(--ink)] mb-1">
                    Return-by Due Date:
                  </label>
                  <input
                    type="text"
                    required
                    value={assignDueDate}
                    onChange={(e) => setAssignDueDate(e.target.value)}
                    placeholder="e.g. Oct 20, 2026"
                    className="w-full px-3 py-2 rounded-xl border border-[var(--line)] bg-[var(--bg)] font-sans focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAssignModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[var(--line)] text-xs font-bold hover:bg-[var(--tint)] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[var(--brand)] text-white text-xs font-bold hover:opacity-90 cursor-pointer shadow-xs"
                  >
                    Assign to Cardholder
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* DRAWER: Inspect Member */}
        {inspectMember && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-end">
            <div className="bg-[var(--surface)] border-l border-[var(--line)] w-full max-w-md h-full p-6 sm:p-8 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
              <div className="space-y-6">
                <div className="flex justify-between items-start pb-4 border-b border-[var(--line)]">
                  <div>
                    <span className="font-label text-[10px] font-bold text-[var(--accent)] uppercase tracking-wider">
                      CARDHOLDER DOSSIER
                    </span>
                    <h3 className="font-display font-extrabold text-2xl text-[var(--ink)] mt-0.5">
                      {inspectMember.name}
                    </h3>
                    <p className="text-xs text-[var(--mute)]">
                      {inspectMember.role} • {inspectMember.email}
                    </p>
                  </div>

                  <button
                    onClick={() => setInspectMember(null)}
                    className="p-1.5 rounded-lg text-[var(--mute)] hover:text-[var(--ink)] hover:bg-[var(--tint)] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 font-label text-xs">
                  <div className="p-3 rounded-xl border border-[var(--line)] bg-[var(--tint)]/40">
                    <span className="text-[10px] text-[var(--mute)] block">STUDY STREAK</span>
                    <span className="font-display font-bold text-base text-[var(--accent)] flex items-center gap-1">
                      <Flame className="w-4 h-4 fill-current" /> {inspectMember.streak} Days
                    </span>
                  </div>
                  <div className="p-3 rounded-xl border border-[var(--line)] bg-[var(--tint)]/40">
                    <span className="text-[10px] text-[var(--mute)] block">LAST SEEN</span>
                    <span className="font-bold text-[var(--ink)] block truncate">
                      {inspectMember.lastActive}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] space-y-3">
                  <span className="font-label text-[10px] font-bold text-[var(--brand)] uppercase tracking-wider">
                    ACTIVE RETURN SLIP
                  </span>
                  <div className="font-display font-bold text-base text-[var(--ink)]">
                    {inspectMember.course}
                  </div>
                  <div className="text-xs text-[var(--mute)]">
                    Progress: {inspectMember.completedCards} of {inspectMember.totalCards} Index Cards Finished
                  </div>
                  <div className="flex justify-between items-center text-xs font-label pt-2 border-t border-[var(--line)]">
                    <span>Due: <b>{inspectMember.dueDate}</b></span>
                    {inspectMember.status === "Overdue" ? (
                      <span className="text-[var(--accent)] font-bold">OVERDUE</span>
                    ) : (
                      <span className="text-[var(--ok)] font-bold">ON TRACK</span>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-dashed border-[var(--line)] space-y-2">
                  <div className="font-bold text-xs text-[var(--ink)]">
                    Supervisor Override
                  </div>
                  <p className="text-[11px] text-[var(--mute)] leading-relaxed">
                    Need to provide extra time due to medical or approved project leave?
                  </p>
                  <button
                    onClick={() => handleExtendDeadline(inspectMember.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--bg)] text-xs font-bold hover:bg-[var(--tint)] transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>Grant +7 Days Extension</span>
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--line)] flex items-center justify-between gap-3">
                <button
                  onClick={() => handleNudgeSingle(inspectMember.id, inspectMember.name)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-xs"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Send Reminder Nudge</span>
                </button>
                <button
                  onClick={() => setInspectMember(null)}
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