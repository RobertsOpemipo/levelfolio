"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { User, ShieldAlert, Briefcase, Sparkles } from "lucide-react";

export type PersonaRole = "learner" | "manager" | "admin";

interface Persona {
  id: string;
  name: string;
  role: PersonaRole;
  title: string;
  defaultRoute: string;
}

export const PERSONAS: Record<PersonaRole, Persona> = {
  learner: {
    id: "00000001-0002-0000-0000-000000000001",
    name: "Amara Okafor",
    role: "learner",
    title: "Cardholder (Learner)",
    defaultRoute: "/archive/reading-room",
  },
  manager: {
    id: "00000001-0002-0000-0000-000000000002",
    name: "Tunde Bakare",
    role: "manager",
    title: "Security Ops Supervisor",
    defaultRoute: "/manager/docket",
  },
  admin: {
    id: "00000001-0002-0000-0000-000000000003",
    name: "Ngozi Eze",
    role: "admin",
    title: "Tenant Administrator",
    defaultRoute: "/admin/workspace",
  },
};

interface PersonaContextType {
  currentPersona: Persona;
  setRole: (role: PersonaRole) => void;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // Derive role naturally from current URL path without an effect or duplicate state
  const currentRole: PersonaRole = useMemo(() => {
    if (pathname.startsWith("/admin")) return "admin";
    if (pathname.startsWith("/manager")) return "manager";
    return "learner";
  }, [pathname]);

  const setRole = (newRole: PersonaRole) => {
    if (newRole === "admin") {
      router.push("/admin/workspace");
    } else if (newRole === "manager") {
      router.push("/manager/docket");
    } else {
      router.push("/archive/reading-room");
    }
  };

  return (
    <PersonaContext.Provider value={{ currentPersona: PERSONAS[currentRole], setRole }}>
      {children}
      <PersonaFloatingBar currentRole={currentRole} onSelectRole={setRole} />
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const context = useContext(PersonaContext);
  if (!context) {
    throw new Error("usePersona must be used within a PersonaProvider");
  }
  return context;
}

function PersonaFloatingBar({
  currentRole,
  onSelectRole,
}: {
  currentRole: PersonaRole;
  onSelectRole: (role: PersonaRole) => void;
}) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-1.5 rounded-2xl bg-[var(--surface)]/95 border border-[var(--line)] shadow-[0_12px_32px_rgba(0,0,0,0.12)] backdrop-blur-md">
      <div className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-label font-bold text-[var(--accent)] border-r border-[var(--line)]">
        <Sparkles className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">DEMO PERSONA:</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onSelectRole("learner")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer ${
            currentRole === "learner"
              ? "bg-[var(--brand)] text-white shadow-xs"
              : "text-[var(--mute)] hover:text-[var(--ink)] hover:bg-[var(--tint)]/50"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Amara (Learner)</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectRole("manager")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer ${
            currentRole === "manager"
              ? "bg-[var(--brand)] text-white shadow-xs"
              : "text-[var(--mute)] hover:text-[var(--ink)] hover:bg-[var(--tint)]/50"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Tunde (Manager)</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectRole("admin")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer ${
            currentRole === "admin"
              ? "bg-[var(--brand)] text-white shadow-xs"
              : "text-[var(--mute)] hover:text-[var(--ink)] hover:bg-[var(--tint)]/50"
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Ngozi (Admin)</span>
        </button>
      </div>
    </div>
  );
}