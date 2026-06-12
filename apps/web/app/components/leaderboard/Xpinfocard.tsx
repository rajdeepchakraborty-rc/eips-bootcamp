"use client";
import React from "react";
import { XP_WAYS } from "@/app/lib/leaderboard";

export default function XPInfoCard({ compact }: { compact?: boolean }) {
  return (
    <div
      className={`relative bg-gradient-to-br from-slate-100/90 via-slate-200/70 to-slate-300/50
        dark:from-slate-800/80 dark:via-slate-900/60 dark:to-slate-900/40 
        rounded-1xl overflow-hidden border border-border 
        ${
        compact ? "text-xs text-foreground/40" : "p-4"
      }`}
    >
      <div className={compact ? "" : "text-sm font-semibold text-foreground/90 mb-3"}>How XP is Earned</div>
      <ul className={compact ? "text-xs text-foreground/40 space-y-1" : "text-sm text-foreground/40 space-y-3"}>
        {XP_WAYS.map((w) => (
          <li key={w.label} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md flex items-center justify-center bg-white/2 text-emerald-400">{w.icon}</div>
              <div>{w.label}</div>
            </div>
            <div className="text-emerald-400 font-semibold">+{w.xp} XP</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
