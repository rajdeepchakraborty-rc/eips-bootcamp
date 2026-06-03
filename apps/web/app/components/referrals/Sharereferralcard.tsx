"use client";
import { useState } from "react";
import type { ReferralStats } from "../../lib/referrals";

export default function ShareReferralCard({ stats }: { stats?: ReferralStats }) {
  const code = stats?.referralCode ?? "—";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (stats?.referralLink) {
      navigator.clipboard.writeText(stats.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-4 bg-accent rounded-md border border-border">
      <h3 className="text-sm font-medium text-foreground">Share your referral</h3>
      <p className="text-xs text-muted-foreground mt-2">Your code: <span className="font-mono bg-zinc-800 px-2 py-1 rounded">{code}</span></p>
      <div className="mt-3">
        <button 
          onClick={handleCopy}
          className="px-3 py-1 bg-emerald-600 text-black rounded hover:bg-emerald-500 transition-colors"
        >
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
