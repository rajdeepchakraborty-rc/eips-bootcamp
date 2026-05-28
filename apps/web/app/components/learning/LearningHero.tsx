// apps/web/components/learning/LearningHero.tsx

import React from 'react';
import { Flame, TrendingUp, Award } from 'lucide-react';

interface LearningHeroProps {
  userName?: string;
}

export const LearningHero: React.FC<LearningHeroProps> = ({ userName = 'User' }) => {
  const bootcampCompletion = 72;
  const currentStreak = 5;
  const currentLevel = 4;
  const totalXP = 2450;

  return (
    <div className="mb-8 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Welcome Text */}
        <div>
          <div className="mb-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-3">
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Welcome back, {userName}!
              </span>
              <span className="ml-3">🚀</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              You're <span className="font-bold text-emerald-400">{bootcampCompletion}%</span> through the bootcamp.
              Keep your <span className="font-bold text-orange-400">{currentStreak}-day streak</span> alive and unlock your potential.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            {/* Level Badge */}
            <div className="relative group">
              <div className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-purple-500/5 backdrop-blur p-4 group-hover:border-purple-500/60 transition-all duration-200">
                <p className="text-xs text-purple-400 uppercase font-semibold mb-2">Level</p>
                <p className="text-3xl font-bold text-white">{currentLevel}</p>
              </div>
            </div>

            {/* XP Badge */}
            <div className="relative group">
              <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 backdrop-blur p-4 group-hover:border-emerald-500/60 transition-all duration-200">
                <p className="text-xs text-emerald-400 uppercase font-semibold mb-2">XP</p>
                <p className="text-3xl font-bold text-emerald-400">{totalXP}</p>
              </div>
            </div>

            {/* Streak Badge */}
            <div className="relative group">
              <div className="rounded-xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-orange-500/5 backdrop-blur p-4 group-hover:border-orange-500/60 transition-all duration-200">
                <p className="text-xs text-orange-400 uppercase font-semibold mb-2">Streak</p>
                <div className="flex items-center gap-1">
                  <Flame size={20} className="text-orange-400" />
                  <p className="text-3xl font-bold text-white">{currentStreak}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Ethereum Illustration Placeholder */}
        <div className="relative h-96 hidden lg:flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-2xl border border-emerald-500/20 backdrop-blur-xl overflow-hidden">
            {/* Animated Ethereum-like shapes */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            
            {/* Ethereum Symbol Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-7xl font-bold text-emerald-400/20">Ξ</div>
            </div>
          </div>

          {/* Progress Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(16, 185, 129, 0.1)"
                  strokeWidth="3"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeDasharray={`${(bootcampCompletion / 100) * 283} 283`}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-4xl font-bold text-emerald-400">{bootcampCompletion}%</p>
                <p className="text-xs text-gray-400 mt-1">Complete</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative backgrounds */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};