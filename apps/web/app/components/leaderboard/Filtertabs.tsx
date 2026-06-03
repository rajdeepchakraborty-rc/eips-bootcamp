"use client";
import React from "react";
import { FilterPeriod } from "@/app/lib/leaderboard";

const TABS: { label: string; value: FilterPeriod }[] = [
  { label: "All Time", value: "all" },
  { label: "This Month", value: "month" },
  { label: "This Week", value: "week" },
];

interface Props {
  active: FilterPeriod;
  onChange: (v: FilterPeriod) => void;
}

export default function FilterTabs({ active, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 mt-5">
      {TABS.map((tab) => {
        const isActive = active === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
              isActive
                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                : "bg-accent border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
