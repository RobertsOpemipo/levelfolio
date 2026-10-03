"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Building2,
  Users,
  Search,
  Download,
  CheckCircle2,
  AlertCircle,
  Lock,
  Plus,
  Bell,
  Sparkles,
  Check,
  X,
  FileCheck,
  ShieldCheck,
  Clock,
  ArrowRight,
  Layers,
  Database,
} from "lucide-react";
import { ArchiveHeader } from "@/components/layout/ArchiveHeader";
import { usePersona } from "@/components/layout/PersonaSwitcher";

interface Department {
  id: string;
  name: string;
  manager: string;
  members: number;
  complianceRate: number;
  pendingSlips: number;
  status: "Compliant" | "Healthy" | "Attention Required";
}

interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  hash: string;
}

interface AssignmentRule {
  id: string;
  title: string;
  trigger: string;
  assignedCourse: string;
  duePeriod: string;
  active: boolean;
}

export default function AdminWorkspacePage() {
  const { currentPersona } = usePersona();
  const [activeTab, setActiveTab] = useState<"departments" | "audit_trail" | "rules">("departments");
  
  // Search & Filters
  const [deptSearch, setDeptSearch] = useState("");
  const [auditSearch, setAuditSearch] = useState("");
  const [auditFilter, setAuditFilter] = useState<"all" | "audit" | "cert" | "nudge">("all");

  // Modals
  const [isNudgeModalOpen, setIsNudgeModalOpen] = useState(false);
  const [isNewRuleModalOpen, setIsNewRuleModalOpen] = useState(false);
  const [nudgeSentToast, setNudgeSentToast] = useState(false);
  const [selectedProofEvent, setSelectedProofEvent] = useState<AuditEvent | null>(null);

  // Departments State
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: "dept-1",
      name: "Security Operations",
      manager: "Tunde Bakare",
      members: 14,
      complianceRate: 85,
      pendingSlips: 2,
      status: "Healthy",
    },
    {
      id: "dept-2",
      name: "Legal & Corporate Risk",
      manager: "Elena Rostova",
      members: 8,
      complianceRate: 100,
      pendingSlips: 0,
      status: "Compliant",
    },
    {
      id: "dept-3",
      name: "Platform Engineering",
      manager: "Kiran Patel",
      members: 32,
      complianceRate: 68,
      pendingSlips: 9,
      status: "Attention Required",
    },
  ]);

  // Audit Events State
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([
    {
      id: "evt-001",
      timestamp: "2026-10-02 07:42:10 UTC",
      actor: "Amara Okafor",
      action: "FINAL_AUDIT_PASSED",
      target: "Cardholder Induction (100%)",
      hash: "0x8f2a...e41b",
    },
    {
      id: "evt-002",
      timestamp: "2026-10-02 07:42:12 UTC",
      actor: "SYSTEM",
      action: "CERTIFICATE_ISSUED",
      target: "Serial LF-2026-0001",
      hash: "0x4b19...99dc",
    },
    {
      id: "evt-003",
      timestamp: "2026-10-01 14:15:00 UTC",
      actor: "Tunde Bakare",
      action: "MANAGER_NUDGE_SENT",
      target: "Sarah Jenkins (Overdue 4d)",
      hash: "0x77c1...120a",
    },
    {
      id: "evt-004",
      timestamp: "2026-09-30 09:00:22 UTC",
      actor: "Ngozi Eze",
      action: "RULE_CREATED",
      target: "Auto-assign DSAR to Legal",
      hash: "0x33e5...fd88",
    },
  ]);

  // Rules State
  const [assignmentRules, setAssignmentRules] = useState<AssignmentRule[]>([
    {
      id: "rule-1",
      title: "Mandatory New Hire Induction",
      trigger: "Onboarded into any department",
      assignedCourse: "Welcome to the Archive: Cardholder Protocols",
      duePeriod: "7 days from hire",
      active: true,
    },
    {
      id: "rule-2",
      title: "Annual Information Security Refresh",
      trigger: "Security Operations & Engineering",
      assignedCourse: "Annual Information Security Standards",
      duePeriod: "Oct 15 deadline",
      active: true,
    },
    {
      id: "rule-3",
      title: "Privacy Compliance Directive",
      trigger: "Legal & Corporate Risk",
      assignedCourse: "Data Subject Access Request (DSAR) Handling",
      duePeriod: "30 days from hire",
      active: true,
    },
  ]);

  // Form State for New Rule Modal
  const [newRuleTitle, setNewRuleTitle] = useState("");
  const [newRuleTrigger, setNewRuleTrigger] = useState("All Departments");
  const [newRuleCourse, setNewRuleCourse] = useState("Information Classification 101");
  const [newRuleDeadline, setNewRuleDeadline] = useState("14 days from hire");

  const handleBroadcastNudge = () => {
    setIsNudgeModalOpen(false);
    setNudgeSentToast(true);

    const newEvt: AuditEvent = {
      id: `evt-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC",
      actor: currentPersona.name,
      action: "COMPANY_BROADCAST_NUDGE",
      target: "11 Cardholders with Pending Tasks",
      hash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
    };

    setAuditEvents((prev) => [newEvt, ...prev]);
    setTimeout(() => setNudgeSentToast(false), 4000);
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleTitle.trim()) return;

    const newRule: AssignmentRule = {
      id: `rule-${Date.now()}`,
      title: newRuleTitle.trim(),
      trigger: newRuleTrigger,
      assignedCourse: newRuleCourse,
      duePeriod: newRuleDeadline,
      active: true,
    };

    setAssignmentRules((prev) => [newRule, ...prev]);

    const auditEvt: AuditEvent = {
      id: `evt-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC",
      actor: currentPersona.name,
      action: "RULE_CREATED",
      target: newRuleTitle.trim(),
      hash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
    };
    setAuditEvents((prev) => [auditEvt, ...prev]);

    setNewRuleTitle("");
    setIsNewRuleModalOpen(false);
  };

  const handleExportAuditReport = () => {
    const headers = "Timestamp,Actor,Action,Target,Proof Hash\n";
    const rows = auditEvents
      .map((e) => `"${e.timestamp}","${e.actor}","${e.action}","${e.target}","${e.hash}"`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `statutory-audit-trail-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredDepts = departments.filter((d) =>
    d.name.toLowerCase().includes(deptSearch.toLowerCase()) ||
    d.manager.toLowerCase().includes(deptSearch.toLowerCase())
  );

  const filteredAudits = auditEvents.filter((evt) => {
    const matchesSearch =
      evt.actor.toLowerCase().includes(auditSearch.toLowerCase()) ||
      evt.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
      evt.target.toLowerCase().includes(auditSearch.toLowerCase()) ||
      evt.hash.toLowerCase().includes(auditSearch.toLowerCase());

    if (!matchesSearch) return false;
    if (auditFilter === "audit") return evt.action.includes("AUDIT");
    if (auditFilter === "cert") return evt.action.includes("CERTIFICATE");
    if (auditFilter === "nudge") return evt.action.includes("NUDGE");
    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] pb-28">
      <ArchiveHeader />

      <main className="max-w-[1140px] mx-auto px-6 py-8 space-y-8">
        {/* Toast Alert */}
        {nudgeSentToast && (
          <div className="fixed top-20 right-6 z-50 bg-emerald-900 text-white px-4 py-3 rounded-xl shadow-lg border border-emerald-700 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-sans font-bold">
              Company-wide reminder broadcasted &amp; recorded to ledger!
            </span>
          </div>
        )}

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--line)] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-label text-[11px] font-bold text-[var(--accent)] uppercase tracking-wider">
                TENANT ADMINISTRATION // {currentPersona.name.toUpperCase()}
              </span>
              <span className="text-[var(--mute)]">•</span>
              <span className="text-xs text-[var(--mute)]">Acme Corporation Archive</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight">
              Company-Wide Governance
            </h1>
            <p className="text-xs text-[var(--mute)] mt-1">
              Statutory auditor oversight, automated enrollment directives, and immutable ledger verification.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
            <button
              onClick={() => setIsNudgeModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-xs font-bold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Broadcast Overdue Nudge</span>
            </button>

            <button
              onClick={handleExportAuditReport}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--brand)] text-white text-xs font-bold hover:opacity-90 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Statutory Audit (CSV)</span>
            </button>
          </div>
        </div>

        {/* 3 High-Level KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs space-y-2">
            <span className="font-label text-[10px] font-bold text-[var(--mute)] uppercase tracking-wider">
              ORGANIZATION HEALTH
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-display text-3xl font-extrabold text-[var(--ink)]">
                79%
              </span>
              <span className="text-xs font-label text-[var(--mute)]">
                43 of 54 Certified
              </span>
            </div>
            <div className="h-2 w-full bg-[var(--tint)] rounded-full overflow-hidden border border-[var(--line)] mt-2">
              <div className="h-full bg-[var(--ok)] rounded-full w-[79%]" />
            </div>
            <p className="text-[11px] text-[var(--mute)] pt-1">
              11 employees have pending courses due this month.
            </p>
          </div>

          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs space-y-2">
            <span className="font-label text-[10px] font-bold text-[var(--mute)] uppercase tracking-wider">
              REPORTING DEPARTMENTS
            </span>
            <div className="flex items-baseline justify-between">
              <span className="font-display text-3xl font-extrabold text-[var(--ink)]">
                3 Teams
              </span>
              <span className="text-xs font-label text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                All Reporting
              </span>
            </div>
            <p className="text-[11px] text-[var(--mute)] pt-1">
              Security Ops, Legal Risk, and Platform Engineering under tracking.
            </p>
          </div>

          {/* NEW ACTIONABLE COMPLIANCE CARD: */}
<div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs space-y-2">
  <span className="font-label text-[10px] font-bold text-[var(--mute)] uppercase tracking-wider">
    ANNUAL REGULATORY AUDIT
  </span>
  <div className="flex items-baseline justify-between">
    <span className="font-display text-3xl font-extrabold text-[var(--accent)] flex items-center gap-1.5">
      12 Days
    </span>
    <span className="text-xs font-label text-[var(--accent)] font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
      Oct 15 Cutoff
    </span>
  </div>
  <p className="text-[11px] text-[var(--mute)] pt-1">
    Data protection compliance deadline. 11 staff need completion nudges.
  </p>
</div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-[var(--surface)] border border-[var(--line)] rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("departments")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "departments"
                ? "bg-[var(--brand)] text-white shadow-xs"
                : "text-[var(--mute)] hover:text-[var(--ink)]"
            }`}
          >
            Departments ({departments.length})
          </button>
          <button
            onClick={() => setActiveTab("audit_trail")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "audit_trail"
                ? "bg-[var(--brand)] text-white shadow-xs"
                : "text-[var(--mute)] hover:text-[var(--ink)]"
            }`}
          >
            Immutable Audit Trail ({auditEvents.length})
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "rules"
                ? "bg-[var(--brand)] text-white shadow-xs"
                : "text-[var(--mute)] hover:text-[var(--ink)]"
            }`}
          >
            Auto-Enrollment Directives ({assignmentRules.length})
          </button>
        </div>

        {/* TAB 1: Department Overview */}
        {activeTab === "departments" && (
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-bold text-[var(--ink)]">
                  Departmental Compliance Rollup
                </h3>
                <p className="text-xs text-[var(--mute)]">
                  Audit view across business units and their accountable supervisors.
                </p>
              </div>

              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-[var(--mute)] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={deptSearch}
                  onChange={(e) => setDeptSearch(e.target.value)}
                  placeholder="Search department or supervisor..."
                  className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-[var(--line)] bg-[var(--bg)] text-xs font-sans focus:outline-none focus:border-[var(--brand)]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--line)] text-[10px] font-label font-bold uppercase text-[var(--mute)]">
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Lead Supervisor</th>
                    <th className="py-3 px-4">Cardholders</th>
                    <th className="py-3 px-4">Compliance %</th>
                    <th className="py-3 px-4">Pending Slips</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)]/60 text-xs font-sans">
                  {filteredDepts.map((dept) => (
                    <tr key={dept.id} className="hover:bg-[var(--tint)]/30 transition-colors">
                      <td className="py-4 px-4 font-bold text-[var(--ink)]">
                        {dept.name}
                      </td>
                      <td className="py-4 px-4 text-[var(--mute)]">
                        {dept.manager}
                      </td>
                      <td className="py-4 px-4 font-label text-[11px]">
                        {dept.members} staff
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold font-label text-xs">{dept.complianceRate}%</span>
                          <div className="w-16 h-1.5 bg-[var(--tint)] rounded-full overflow-hidden border border-[var(--line)]">
                            <div
                              className="h-full bg-[var(--ok)] rounded-full"
                              style={{ width: `${dept.complianceRate}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {dept.pendingSlips > 0 ? (
                          <span className="font-label text-xs font-bold text-[var(--accent)]">
                            {dept.pendingSlips} pending
                          </span>
                        ) : (
                          <span className="font-label text-xs text-[var(--ok)] font-bold">All clear</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right">
                        {dept.status === "Compliant" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold font-label text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3" /> Compliant
                          </span>
                        )}
                        {dept.status === "Healthy" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold font-label text-[var(--brand)] bg-[var(--tint)] border border-[var(--line)] px-2 py-0.5 rounded">
                            On Track
                          </span>
                        )}
                        {dept.status === "Attention Required" && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold font-label text-amber-800 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded">
                            <AlertCircle className="w-3 h-3" /> Needs Review
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

        {/* TAB 2: Immutable Audit Trail */}
        {activeTab === "audit_trail" && (
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-[var(--ink)]">
                  Tamper-Evident System Audit Trail
                </h3>
                <p className="text-xs text-[var(--mute)]">
                  Cryptographically referenced ledger of every course completion, stamp issuance, and nudge.
                </p>
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-[var(--bg)] border border-[var(--line)] rounded-xl">
                <button
                  onClick={() => setAuditFilter("all")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    auditFilter === "all" ? "bg-[var(--brand)] text-white" : "text-[var(--mute)]"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setAuditFilter("audit")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    auditFilter === "audit" ? "bg-[var(--brand)] text-white" : "text-[var(--mute)]"
                  }`}
                >
                  Audits
                </button>
                <button
                  onClick={() => setAuditFilter("cert")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    auditFilter === "cert" ? "bg-[var(--brand)] text-white" : "text-[var(--mute)]"
                  }`}
                >
                  Certificates
                </button>
                <button
                  onClick={() => setAuditFilter("nudge")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    auditFilter === "nudge" ? "bg-[var(--brand)] text-white" : "text-[var(--mute)]"
                  }`}
                >
                  Nudges
                </button>
              </div>
            </div>

            <div className="relative max-w-sm">
              <Search className="w-4 h-4 text-[var(--mute)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                placeholder="Search staff, action, or proof hash..."
                className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-[var(--line)] bg-[var(--bg)] text-xs font-sans focus:outline-none focus:border-[var(--brand)]"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--line)] text-[10px] font-label font-bold uppercase text-[var(--mute)]">
                    <th className="py-3 px-4">Timestamp (UTC)</th>
                    <th className="py-3 px-4">Actor</th>
                    <th className="py-3 px-4">Action</th>
                    <th className="py-3 px-4">Details</th>
                    <th className="py-3 px-4 text-right">Verification Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)]/60 text-xs font-sans">
                  {filteredAudits.map((evt) => (
                    <tr key={evt.id} className="hover:bg-[var(--tint)]/30 transition-colors">
                      <td className="py-3.5 px-4 font-label text-[11px] text-[var(--mute)]">
                        {evt.timestamp}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[var(--ink)]">
                        {evt.actor}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-label text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--tint)] border border-[var(--line)] text-[var(--brand)]">
                          {evt.action}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[var(--ink)]">
                        {evt.target}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedProofEvent(evt)}
                          className="font-label text-[10px] text-[var(--brand)] font-bold hover:underline cursor-pointer"
                        >
                          {evt.hash} (Inspect)
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Auto-Enrollment Directives */}
        {activeTab === "rules" && (
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
              <div>
                <h3 className="font-display text-lg font-bold text-[var(--ink)]">
                  Automated Assignment Directives
                </h3>
                <p className="text-xs text-[var(--mute)]">
                  Rules that automatically assign courses when employees are hired into departments.
                </p>
              </div>

              <button
                onClick={() => setIsNewRuleModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--brand)] text-white text-xs font-bold hover:opacity-90 transition-all cursor-pointer shadow-xs active:scale-95 self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Directive</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {assignmentRules.map((rule) => (
                <div
                  key={rule.id}
                  className="p-5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] flex flex-col justify-between space-y-4 shadow-xs"
                >
                  <div className="space-y-2">
                    <span className="font-label text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ACTIVE AUTOMATION
                    </span>
                    <h4 className="font-display font-bold text-base text-[var(--ink)]">
                      {rule.title}
                    </h4>
                    <p className="text-xs text-[var(--mute)]">
                      <b>Trigger:</b> {rule.trigger}
                    </p>
                    <p className="text-xs text-[var(--mute)]">
                      <b>Course:</b> {rule.assignedCourse}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs font-label">
                    <span className="text-[var(--accent)] font-bold">
                      {rule.duePeriod}
                    </span>
                    <span className="text-emerald-700 font-bold">Running</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL 1: Broadcast Nudge */}
        {isNudgeModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-xl space-y-4 animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center pb-2 border-b border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[var(--accent)]" />
                  <h3 className="font-display font-bold text-lg text-[var(--ink)]">
                    Send Company Reminders
                  </h3>
                </div>
                <button
                  onClick={() => setIsNudgeModalOpen(false)}
                  className="text-[var(--mute)] hover:text-[var(--ink)] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[var(--mute)] leading-relaxed">
                This will send an automated reminder to all <b>11 cardholders</b> across all departments with courses due within 14 days.
              </p>

              <div className="p-3 bg-[var(--tint)]/50 rounded-xl border border-[var(--line)] text-xs space-y-1">
                <div className="font-bold text-[var(--ink)]">Targeted Personnel:</div>
                <div className="text-[var(--mute)]">• 9 staff in Platform Engineering</div>
                <div className="text-[var(--mute)]">• 2 staff in Security Operations</div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  onClick={() => setIsNudgeModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[var(--line)] text-xs font-bold hover:bg-[var(--tint)] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBroadcastNudge}
                  className="px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-xs font-bold hover:opacity-90 cursor-pointer shadow-xs"
                >
                  Confirm &amp; Send Reminders
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 2: Create Directive */}
        {isNewRuleModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-xl space-y-4 animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center pb-2 border-b border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--brand)]" />
                  <h3 className="font-display font-bold text-lg text-[var(--ink)]">
                    New Enrollment Directive
                  </h3>
                </div>
                <button
                  onClick={() => setIsNewRuleModalOpen(false)}
                  className="text-[var(--mute)] hover:text-[var(--ink)] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateRule} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[var(--ink)] mb-1">
                    Directive Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={newRuleTitle}
                    onChange={(e) => setNewRuleTitle(e.target.value)}
                    placeholder="e.g. Sales Team Anti-Bribery Directive"
                    className="w-full px-3 py-2 rounded-xl border border-[var(--line)] bg-[var(--bg)] font-sans focus:outline-none focus:border-[var(--brand)]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[var(--ink)] mb-1">
                    Target Department:
                  </label>
                  <select
                    value={newRuleTrigger}
                    onChange={(e) => setNewRuleTrigger(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--line)] bg-[var(--bg)] font-sans focus:outline-none focus:border-[var(--brand)]"
                  >
                    <option value="All Departments">All Departments (New Hires)</option>
                    <option value="Platform Engineering">Platform Engineering Only</option>
                    <option value="Security Operations">Security Operations Only</option>
                    <option value="Legal & Corporate Risk">Legal & Corporate Risk</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[var(--ink)] mb-1">
                    Course to Assign:
                  </label>
                  <select
                    value={newRuleCourse}
                    onChange={(e) => setNewRuleCourse(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--line)] bg-[var(--bg)] font-sans focus:outline-none focus:border-[var(--brand)]"
                  >
                    <option value="Information Classification 101">Information Classification 101</option>
                    <option value="Secure Code Review Fundamentals">Secure Code Review Fundamentals</option>
                    <option value="Workplace Ethics & Protocols">Workplace Ethics & Protocols</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[var(--ink)] mb-1">
                    Due Window:
                  </label>
                  <select
                    value={newRuleDeadline}
                    onChange={(e) => setNewRuleDeadline(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--line)] bg-[var(--bg)] font-sans focus:outline-none focus:border-[var(--brand)]"
                  >
                    <option value="7 days from hire">7 days from hire</option>
                    <option value="14 days from hire">14 days from hire</option>
                    <option value="30 days from hire">30 days from hire</option>
                  </select>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNewRuleModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[var(--line)] text-xs font-bold hover:bg-[var(--tint)] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[var(--brand)] text-white text-xs font-bold hover:opacity-90 cursor-pointer shadow-xs"
                  >
                    Save &amp; Activate Directive
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 3: Inspect Hash Proof */}
        {selectedProofEvent && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-xl space-y-4 animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center pb-2 border-b border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-display font-bold text-lg text-[var(--ink)]">
                    Audit Verification Receipt
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProofEvent(null)}
                  className="text-[var(--mute)] hover:text-[var(--ink)] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-[var(--mute)] block text-[10px] font-label uppercase">EVENT ID:</span>
                  <span className="font-mono font-bold text-[var(--ink)]">{selectedProofEvent.id}</span>
                </div>
                <div>
                  <span className="text-[var(--mute)] block text-[10px] font-label uppercase">VERIFIED TIME:</span>
                  <span className="font-mono text-[var(--ink)]">{selectedProofEvent.timestamp}</span>
                </div>
                <div>
                  <span className="text-[var(--mute)] block text-[10px] font-label uppercase">ACTION:</span>
                  <span className="font-bold text-[var(--brand)]">{selectedProofEvent.action}</span>
                </div>
                <div>
                  <span className="text-[var(--mute)] block text-[10px] font-label uppercase">TARGET / SUBJECT:</span>
                  <span className="text-[var(--ink)]">{selectedProofEvent.target}</span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 font-mono text-[11px] break-all">
                  <b>CRYPTOGRAPHIC RECEIPT:</b><br />
                  {selectedProofEvent.hash} (Verified via PostgreSQL Ledger)
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedProofEvent(null)}
                  className="px-4 py-2 rounded-xl bg-[var(--brand)] text-white text-xs font-bold hover:opacity-90 cursor-pointer shadow-xs"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}