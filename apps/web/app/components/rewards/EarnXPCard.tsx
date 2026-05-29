// apps/web/app/components/rewards/EarnXPCard.tsx

'use client';

import React from 'react';
import { XP_ACTIVITIES } from '@/app/lib/rewards';

export const EarnXPCard: React.FC = () => {
  const activityEmojis: Record<string, string> = {
    'Refer a friend': '👥',
    'Complete a module': '📚',
    'Submit an assignment': '📝',
    'Attend a live session': '🎤',
    'Community contribution': '🤝',
  };

  return (
    <div className="relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent rounded-2xl blur-xl" />

      {/* Card */}
      <div className="relative bg-gradient-to-br from-slate-800/80 via-slate-900/60 to-slate-900/40 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-8 shadow-xl">
        {/* Background Pattern */}
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-6">How to Earn More XP</h3>

        {/* Activities List */}
        <div className="space-y-4 mb-6">
          {XP_ACTIVITIES.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-800/40 border border-emerald-500/10 hover:border-emerald-500/30 hover:bg-slate-800/60 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">
                  {activityEmojis[activity.activity] || '⭐'}
                </span>
                <span className="text-sm text-gray-300">
                  {activity.activity}
                </span>
              </div>
              <span className="text-emerald-400 font-bold text-sm">
                +{activity.xpValue}
              </span>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <button className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-600/20 to-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-bold text-sm uppercase tracking-wider hover:from-emerald-600/40 hover:to-emerald-500/20 hover:border-emerald-500/60 transition-all duration-300 flex items-center justify-center gap-2">
          <span>View all ways to earn XP</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};