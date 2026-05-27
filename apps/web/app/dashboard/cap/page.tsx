"use client";

// app/dashboard/cap/page.tsx

import React, { useEffect, useState } from "react";
import { useUser, UserButton } from '@clerk/nextjs';
import Link from "next/link";
import { fetchCAPApplication, CAPApplication } from "../../lib/Cap";
import CapApplicationForm from "../../components/cap/CapApplicationForm";
import CapStatusCard from "../../components/cap/CapStatusCard";

// ─── Sidebar nav items (mirroring the existing dashboard) ────────────────────
const NAV_MAIN = [
  { label: "Dashboard", href: "/dashboard", icon: <DashIcon /> },
  { label: "My Learning", href: "/dashboard/learning", icon: <BookIcon /> },
  { label: "Bootcamp Modules", href: "/dashboard/bootcamp", icon: <LayersIcon /> },
  { label: "Assignments", href: "/dashboard/assignments", icon: <ClipboardIcon /> },
  { label: "Leaderboard", href: "/dashboard/leaderboard", icon: <TrophyIcon /> },
];

const NAV_CAP = [
  { label: "CAP Status", href: "/dashboard/cap", icon: <ShieldIcon />, active: true },
  { label: "Referrals", href: "/dashboard/referrals", icon: <UsersIcon /> },
  { label: "Rewards", href: "/dashboard/rewards", icon: <GiftIcon /> },
  { label: "Wallet", href: "/dashboard/wallet", icon: <WalletIcon /> },
];

const NAV_ADMIN = [
  { label: "Admin Analytics", href: "/dashboard/admin", icon: <BarChartIcon /> },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CAPPage() {
  const [application, setApplication] = useState<CAPApplication | null | undefined>(undefined);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return;
    fetchCAPApplication(user.id).then(setApplication);
  }, [user?.id]);

  const loading = application === undefined;

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "#050505", fontFamily: "'Geist', 'Inter', sans-serif" }}
    >
      {/* ── Sidebar ───────────────────────────────────────────────────── */}
      <>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-30
            flex flex-col
            w-64 shrink-0
            transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
          style={{
            background: "rgba(6,6,6,0.97)",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 px-5 py-5 border-b border-white/[0.06]">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(135deg, #34d399 0%, #059669 100%)",
                boxShadow: "0 0 20px rgba(52,211,153,0.4)",
              }}
            >
              <EtherDiamond />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">EIPsInsight</p>
              <p className="text-emerald-400 text-xs font-medium leading-none mt-0.5">
                Academy
              </p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
            <NavGroup label="MAIN" items={NAV_MAIN} />
            <NavGroup label="CAP PROGRAM" items={NAV_CAP} />
            <NavGroup label="ADMIN" items={NAV_ADMIN} />
          </nav>

          {/* Upgrade */}
          <div className="p-4">
            <div
              className="rounded-2xl p-4 text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(52,211,153,0.08) 0%, rgba(5,150,105,0.04) 100%)",
                border: "1px solid rgba(52,211,153,0.15)",
              }}
            >
              <div className="text-xl mb-2">👑</div>
              <p className="text-emerald-400 font-semibold text-sm mb-1">
                Upgrade to Pro
              </p>
              <p className="text-white/35 text-xs leading-relaxed mb-3">
                Unlock advanced analytics, exclusive content and priority
                support.
              </p>
              <button
                className="w-full py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #34d399, #059669)",
                  color: "#000",
                  boxShadow: "0 0 16px rgba(52,211,153,0.3)",
                }}
              >
                Upgrade Now →
              </button>
            </div>
          </div>
        </aside>
      </>

      {/* ── Main ──────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header
          className="sticky top-0 z-10 flex items-center gap-4 px-6 py-3"
          style={{
            background: "rgba(5,5,5,0.9)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Hamburger (mobile) */}
          <button
            className="lg:hidden text-white/50 hover:text-white transition-colors p-1"
            onClick={() => setSidebarOpen(true)}
          >
            <HamburgerIcon />
          </button>

          {/* Search */}
          <div
            className="flex items-center gap-2 flex-1 max-w-md px-3 py-2 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <SearchIcon />
            <span className="text-white/25 text-sm">
              Search courses, modules, topics…
            </span>
            <kbd
              className="ml-auto text-white/20 text-xs px-1.5 py-0.5 rounded"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              ⌘K
            </kbd>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Notifications */}
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-white/5">
              <BellIcon />
              <span
                className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-black"
                style={{ background: "#34d399" }}
              >
                3
              </span>
            </button>

            {/* XP */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{
                background: "rgba(52,211,153,0.1)",
                border: "1px solid rgba(52,211,153,0.2)",
              }}
            >
              <span className="text-xs font-medium text-white/50">XP</span>
              <span className="text-sm font-bold text-emerald-400">2,450</span>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-2.5">
              <div className="text-left hidden sm:block">
                <p className="text-white text-xs font-medium leading-none">
                  {user?.firstName ?? user?.username ?? 'User'}
                </p>
                <p className="text-white/35 text-[10px] leading-none mt-0.5">
                  Student
                </p>
              </div>
              <UserButton
                appearance={{ elements: { avatarBox: 'w-8 h-8 rounded-full ring-2 ring-emerald-500/30' } }}
              />
            </div>
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 overflow-y-auto">
          {/* ── Hero ───────────────────────────────────────────────── */}
          <div
            className="relative overflow-hidden px-6 pt-8 pb-10"
            style={{
              background:
                "linear-gradient(180deg, rgba(52,211,153,0.04) 0%, transparent 100%)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* Background grid */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(52,211,153,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.03) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative flex items-center justify-between max-w-5xl">
              {/* Left text */}
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mt-1"
                  style={{
                    background: "rgba(52,211,153,0.12)",
                    border: "1px solid rgba(52,211,153,0.25)",
                    boxShadow: "0 0 24px rgba(52,211,153,0.15)",
                  }}
                >
                  <StarIcon />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white tracking-tight">
                    CAP Program
                  </h1>
                  <p className="text-white/45 text-sm mt-1.5 max-w-lg leading-relaxed">
                    Join the EIPsInsight Campus Ambassador Program and help grow
                    Ethereum education on your campus.
                  </p>
                </div>
              </div>

              {/* Right — Ethereum crystal visual */}
              <div className="hidden md:flex items-center justify-center w-32 h-24 relative">
                <EthereumCrystal />
              </div>
            </div>

            {/* Empower banner */}
            <div
              className="relative mt-6 inline-flex items-center gap-3 px-4 py-2.5 rounded-xl max-w-xs"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span className="text-emerald-400 text-base">✦</span>
              <div>
                <p className="text-white text-xs font-medium">
                  Empower your campus.
                </p>
                <p className="text-white/35 text-xs">
                  Earn XP. Unlock perks. Grow your network.
                </p>
              </div>
            </div>
          </div>

          {/* ── Content area ───────────────────────────────────────── */}
          <div className="px-6 py-10">
            <div className="max-w-5xl mx-auto">
              {loading ? (
                <LoadingSkeleton />
              ) : application === null ? (
                /* NOT APPLIED → show form */
                <CapApplicationForm
                  onSubmitted={(app) => setApplication(app)}
                />
              ) : (
                /* APPLIED → show exactly one status card */
                <CapStatusCard application={application} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Nav helpers ─────────────────────────────────────────────────────────────

function NavGroup({
  label,
  items,
}: {
  label: string;
  items: { label: string; href: string; icon: React.ReactNode; active?: boolean }[];
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-widest text-white/20 px-3 mb-2">
        {label}
      </p>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 group"
              style={
                item.active
                  ? {
                      background: "rgba(52,211,153,0.12)",
                      color: "#34d399",
                      border: "1px solid rgba(52,211,153,0.2)",
                    }
                  : {
                      color: "rgba(255,255,255,0.45)",
                    }
              }
            >
              <span
                style={
                  item.active ? { color: "#34d399" } : { color: "rgba(255,255,255,0.3)" }
                }
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Loading skeleton ────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="max-w-2xl mx-auto space-y-4 animate-pulse">
      <div
        className="h-64 rounded-2xl"
        style={{ background: "rgba(255,255,255,0.04)" }}
      />
      <div
        className="h-32 rounded-2xl"
        style={{ background: "rgba(255,255,255,0.03)" }}
      />
    </div>
  );
}

// ─── Ethereum Crystal SVG ────────────────────────────────────────────────────

function EthereumCrystal() {
  return (
    <svg viewBox="0 0 120 120" width="120" height="120" fill="none">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </radialGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      {/* Glow */}
      <circle cx="60" cy="60" r="50" fill="url(#glow)" filter="url(#blur)" />
      {/* Crystal top */}
      <polygon points="60,10 80,50 60,42 40,50" fill="rgba(52,211,153,0.8)" />
      <polygon points="60,10 80,50 60,42" fill="rgba(52,211,153,0.5)" />
      {/* Crystal mid */}
      <polygon points="40,50 60,42 80,50 60,80" fill="rgba(52,211,153,0.6)" />
      <polygon points="60,42 80,50 60,80" fill="rgba(52,211,153,0.35)" />
      {/* Crystal bottom */}
      <polygon points="40,50 60,80 60,108" fill="rgba(52,211,153,0.4)" />
      <polygon points="80,50 60,80 60,108" fill="rgba(52,211,153,0.25)" />
      {/* Orbit ring */}
      <ellipse cx="60" cy="60" rx="48" ry="18" stroke="rgba(52,211,153,0.3)" strokeWidth="1" fill="none" strokeDasharray="4 3" />
    </svg>
  );
}

// ─── Inline SVG icons ────────────────────────────────────────────────────────

const ic = (d: string) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

function DashIcon() { return ic("M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"); }
function BookIcon() { return ic("M4 19.5A2.5 2.5 0 0 1 6.5 17H20"); }
function LayersIcon() { return ic("M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"); }
function ClipboardIcon() { return ic("M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"); }
function TrophyIcon() { return ic("M6 9H4.5a2.5 2.5 0 0 1 0-5H6"); }
function ShieldIcon() { return ic("M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"); }
function UsersIcon() { return ic("M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"); }
function GiftIcon() { return ic("M20 12v10H4V12"); }
function WalletIcon() { return ic("M21 12V7H5a2 2 0 0 1 0-4h14v4"); }
function BarChartIcon() { return ic("M18 20V10M12 20V4M6 20v-6"); }
function HamburgerIcon() { return ic("M3 12h18M3 6h18M3 18h18"); }
function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.8">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function EtherDiamond() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <polygon points="12,2 20,10 12,14 4,10" fill="#34d399" opacity="0.9" />
      <polygon points="4,10 12,14 12,22" fill="#34d399" opacity="0.5" />
      <polygon points="20,10 12,14 12,22" fill="#34d399" opacity="0.7" />
    </svg>
  );
} 