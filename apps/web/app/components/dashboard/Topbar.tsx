'use client';

import { Bell, Search, Menu } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { ThemeToggle } from '@/app/components/ThemeToggle';

interface TopbarProps {
  onMobileMenuOpen: () => void;
}

export function Topbar({ onMobileMenuOpen }: TopbarProps) {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-30 h-[60px] bg-background text-foreground backdrop-blur-xl border-b border-gray-200 dark:border-white/5 flex items-center px-4 lg:px-6 gap-4">
      {/* Mobile hamburger */}
      <button
        onClick={onMobileMenuOpen}
        className="lg:hidden text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors p-1"
      >
        <Menu size={20} />
      </button>

      {/* Desktop sidebar toggle (decorative) */}
      <button className="hidden lg:flex text-gray-600 dark:text-gray-400 dark:text-zinc-600 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors p-1">
        <Menu size={18} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-[500px]">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Search courses, modules, topics..."
            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/8 rounded-lg pl-9 pr-16 py-2 text-sm text-gray-900 dark:text-zinc-300 placeholder:text-gray-500 dark:placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/40 focus:bg-white dark:focus:bg-white/8 transition-all duration-200"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
            <kbd className="text-[10px] text-gray-500 dark:text-zinc-600 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/8 rounded px-1.5 py-0.5 font-mono">⌘K</kbd>
          </div>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Notification bell */}
        <button className="relative p-2 text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/8 rounded-lg transition-all duration-200">
          <Bell size={17} />
          <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-emerald-500 text-black text-[9px] font-bold rounded-full flex items-center justify-center min-w-[18px] min-h-[18px]">
            3
          </span>
        </button>

        {/* XP Badge */}
        <div className="flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 rounded-lg px-3 py-1.5">
          <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">XP</span>
          <span className="text-emerald-700 dark:text-emerald-300 font-bold text-sm">2,450</span>
        </div>

        {/* User info + Clerk button */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-black dark:text-white text-sm font-semibold leading-none">
              {user?.firstName ?? 'User'}
            </span>
            <span className="text-gray-600 dark:text-zinc-500 text-xs mt-0.5">Student</span>
          </div>
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-8 h-8 rounded-full ring-2 ring-emerald-500/30',
              },
            }}
          />
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Topbar;
