// apps/web/components/learning/AchievementBadges.tsx

import React from 'react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
}

const badges: Badge[] = [
  {
    id: '1',
    name: 'First Module',
    description: 'Completed first module',
    icon: '🎯',
    unlocked: true,
  },
  {
    id: '2',
    name: '7-Day Streak',
    description: 'Learn 7 days in a row',
    icon: '🔥',
    unlocked: true,
  },
  {
    id: '3',
    name: 'Assignment Master',
    description: 'Submit 10 assignments',
    icon: '📝',
    unlocked: true,
  },
  {
    id: '4',
    name: 'Smart Explorer',
    description: 'Complete Smart Contracts module',
    icon: '🧠',
    unlocked: false,
    progress: 75,
  },
  {
    id: '5',
    name: 'Top 10',
    description: 'Reach top 10 in leaderboard',
    icon: '🏆',
    unlocked: true,
  },
  {
    id: '6',
    name: 'Code Master',
    description: 'Master all coding challenges',
    icon: '💻',
    unlocked: false,
    progress: 45,
  },
];

export const AchievementBadges: React.FC = () => {
  return (
    <div className="relative group h-full">
      <div
        className={`
          relative rounded-2xl
          border border-yellow-500/30
          bg-gradient-to-br from-yellow-500/10 to-yellow-500/5
          backdrop-blur-xl
          p-6
          transition-all duration-300
          hover:border-yellow-500/60
          hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]
          overflow-hidden
          flex flex-col
        `}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br from-yellow-400 to-transparent pointer-events-none" />

        <div className="relative z-10 flex-1 flex flex-col">
          <div className="mb-6">
            <p className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">
              Achievements
            </p>
            <h3 className="text-2xl font-bold text-white mt-1">
              Your Badges
            </h3>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-3 gap-4 flex-1">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`
                  relative group/badge rounded-lg border p-4 flex flex-col items-center justify-center text-center
                  transition-all duration-200
                  ${
                    badge.unlocked
                      ? 'border-yellow-500/40 bg-yellow-500/10 hover:border-yellow-500/60 hover:bg-yellow-500/15'
                      : 'border-gray-700/50 bg-gray-900/30 hover:bg-gray-900/50'
                  }
                `}
              >
                {/* Glow effect for unlocked */}
                {badge.unlocked && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-yellow-400/0 via-yellow-400/0 to-yellow-400/10 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300" />
                )}

                {/* Content */}
                <div className="relative z-10">
                  <p className="text-4xl mb-2">{badge.icon}</p>
                  <p className="text-xs font-bold text-white mb-1">
                    {badge.name}
                  </p>
                  <p className="text-xs text-gray-400 line-clamp-2">
                    {badge.description}
                  </p>

                  {/* Progress for locked badges */}
                  {!badge.unlocked && badge.progress && (
                    <div className="mt-3 pt-2 border-t border-gray-700/50">
                      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden mb-1">
                        <div
                          className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all"
                          style={{ width: `${badge.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        {badge.progress}%
                      </p>
                    </div>
                  )}

                  {/* Unlocked indicator */}
                  {badge.unlocked && (
                    <p className="text-xs text-yellow-400 font-semibold mt-2">
                      ✓ Unlocked
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-6 pt-4 border-t border-gray-700/50">
            <button
              className={`
                w-full rounded-lg font-medium py-3 px-4
                transition-all duration-200
                border border-yellow-500/50 hover:border-yellow-500/80
                bg-yellow-500/10 hover:bg-yellow-500/20
                text-yellow-300 hover:text-yellow-200
                text-sm
              `}
            >
              View All Badges →
            </button>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};