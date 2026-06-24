"use client";

import { Users } from 'lucide-react';

export default function ReferralHero() {
  return (
    <div className="flex items-start justify-between mb-6">
      {/* Left: Title */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-2">
          <Users size={16} />
          REFERRALS
        </div>
        <div>
          <h1 className="text-5xl font-bold text-foreground tracking-tight">My Referrals</h1>
          <p className="text-muted-foreground text-lg mt-0.5">Invite builders and grow the Ethereum ecosystem.</p>
        </div>
      </div>

      {/* Right: Ethereum Crystal Network Visual */}
      <div className="relative w-64 h-36 hidden md:flex items-center justify-center overflow-hidden">
        {/* Glow base */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full bg-emerald-500/5 blur-2xl" />
        </div>

        {/* SVG Network */}
        <svg
          width="260"
          height="140"
          viewBox="0 0 260 140"
          fill="none"
          className="relative z-10"
        >
          {/* Connection lines */}
          <line x1="130" y1="60" x2="50" y2="110" stroke="#10b981" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="130" y1="60" x2="210" y2="110" stroke="#10b981" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="130" y1="60" x2="20" y2="70" stroke="#10b981" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="130" y1="60" x2="240" y2="70" stroke="#10b981" strokeWidth="1" strokeOpacity="0.3" />

          {/* Orbit ring */}
          <ellipse cx="130" cy="75" rx="55" ry="18" stroke="#10b981" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="4 4" />

          {/* Center Ethereum diamond */}
          <g transform="translate(110, 20)">
            {/* Diamond shape */}
            <polygon points="20,0 38,20 20,55 2,20" fill="none" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.9" />
            <polygon points="20,0 38,20 20,32 2,20" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1" />
            <line x1="2" y1="20" x2="38" y2="20" stroke="#10b981" strokeWidth="0.8" strokeOpacity="0.5" />
            <line x1="20" y1="0" x2="20" y2="55" stroke="#10b981" strokeWidth="0.5" strokeOpacity="0.3" />
            {/* Glow */}
            <polygon points="20,0 38,20 20,55 2,20" fill="none" stroke="#34d399" strokeWidth="2" strokeOpacity="0.3" filter="url(#glow)" />
          </g>

          {/* Node circles at branches */}
          <circle cx="50" cy="110" r="8" fill="#0a0a0a" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.7" />
          <circle cx="50" cy="110" r="4" fill="#10b981" fillOpacity="0.6" />

          <circle cx="210" cy="110" r="8" fill="#0a0a0a" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.7" />
          <circle cx="210" cy="110" r="4" fill="#10b981" fillOpacity="0.6" />

          <circle cx="20" cy="70" r="6" fill="#0a0a0a" stroke="#10b981" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="20" cy="70" r="3" fill="#10b981" fillOpacity="0.4" />

          <circle cx="240" cy="70" r="6" fill="#0a0a0a" stroke="#10b981" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="240" cy="70" r="3" fill="#10b981" fillOpacity="0.4" />

          {/* Person icons at large nodes */}
          <g transform="translate(42, 94)" opacity="0.8">
            <circle cx="8" cy="4" r="3" fill="#10b981" fillOpacity="0.7" />
            <path d="M2,16 Q8,10 14,16" fill="#10b981" fillOpacity="0.5" />
          </g>
          <g transform="translate(202, 94)" opacity="0.8">
            <circle cx="8" cy="4" r="3" fill="#10b981" fillOpacity="0.7" />
            <path d="M2,16 Q8,10 14,16" fill="#10b981" fillOpacity="0.5" />
          </g>

          {/* Platform glow base */}
          <ellipse cx="130" cy="118" rx="28" ry="6" fill="#10b981" fillOpacity="0.15" />

          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}