'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUser, UserButton } from '@clerk/nextjs';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { navLinks } from '../../lib/landing-data';
import { ThemeToggle } from '@/app/components/ThemeToggle';

export function Navbar() {
  const { isSignedIn } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#080808]/90 backdrop-blur-xl border-b border-gray-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 text-emerald-400 dark:text-emerald-400" fill="currentColor" width="18" height="18">
                <polygon points="12,2 20,8 20,16 12,22 4,16 4,8" opacity="0.25" />
                <polygon points="12,2 20,8 12,12" />
                <polygon points="4,8 12,12 12,22" opacity="0.6" />
                <polygon points="20,8 12,12 12,22" opacity="0.85" />
              </svg>
            </div>
            <div>
              <div className="text-black dark:text-white font-bold text-sm leading-none">EIPsInsight</div>
              <div className="text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold mt-0.5">Bootcamp</div>
            </div>
          </Link>

          {/* Desktop nav — center */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link: { label: string; href: string }) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-sm text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-150 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-3 ml-auto">
            {isSignedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Dashboard <ArrowRight size={14} />
                </Link>
                <UserButton
                  appearance={{ elements: { avatarBox: 'w-8 h-8 ring-2 ring-emerald-500/30 rounded-full' } }}
                />
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white text-sm font-medium px-3 py-2 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="flex items-center gap-1.5 bg-transparent hover:bg-emerald-100 dark:hover:bg-white/5 border border-gray-300 dark:border-white/15 hover:border-emerald-400 dark:hover:border-white/25 text-black dark:text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Get Started <ArrowRight size={13} />
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden ml-auto text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white p-1.5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-white/5 bg-white/98 dark:bg-[#080808]/98 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link: { label: string; href: string }) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg text-sm font-medium transition-all"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-zinc-200 dark:border-white/5 space-y-2">
              {isSignedIn ? (
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-2 w-full bg-emerald-500 text-black font-bold text-sm py-2.5 rounded-lg"
                >
                  Go to Dashboard <ArrowRight size={14} />
                </Link>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="block text-center py-2.5 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white text-sm font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="block text-center bg-emerald-500 text-black font-bold text-sm py-2.5 rounded-lg"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}