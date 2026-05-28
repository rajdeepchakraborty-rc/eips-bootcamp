// apps/web/components/learning/LearningStreak.tsx

import React from 'react';
import { Flame } from 'lucide-react';

export const LearningStreak: React.FC = () => {
  // Generate mock streak data for 8 weeks
  const generateStreakData = () => {
    const data = [];
    const today = new Date();
    for (let i = 56; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const hasActivity = Math.random() > 0.3;
      const intensity = hasActivity ? Math.floor(Math.random() * 4) : 0;
      data.push({ date, intensity });
    }
    return data;
  };

  const streakData = generateStreakData();
  const currentStreak = 5;
  const longestStreak = 14;

  // Group data by week
  const weeks = [];
  for (let i = 0; i < streakData.length; i += 7) {
    weeks.push(streakData.slice(i, i + 7));
  }

  const getColor = (intensity: number) => {
    if (intensity === 0) return 'bg-gray-800';
    if (intensity === 1) return 'bg-emerald-900';
    if (intensity === 2) return 'bg-emerald-700';
    if (intensity === 3) return 'bg-emerald-500';
    return 'bg-emerald-400';
  };

  return (
    <div className="relative group">
      <div
        className={`
          relative rounded-2xl
          border border-emerald-500/30
          bg-gradient-to-br from-emerald-500/10 to-emerald-500/5
          backdrop-blur-xl
          p-8
          transition-all duration-300
          hover:border-emerald-500/60
          hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]
          overflow-hidden
        `}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br from-emerald-400 to-transparent pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                Consistency
              </p>
              <h3 className="text-3xl font-bold text-white">Learning Streak</h3>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-xs text-gray-400 font-medium mb-2">
                  Current Streak
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Flame className="text-orange-400" size={24} />
                  <p className="text-3xl font-bold text-white">
                    {currentStreak}
                  </p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400 font-medium mb-2">
                  Longest Streak
                </p>
                <p className="text-3xl font-bold text-emerald-400">
                  {longestStreak}
                </p>
              </div>
            </div>
          </div>

          {/* Heatmap */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-1 mb-4 min-w-max">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`
                        w-6 h-6 rounded
                        border border-gray-700/50
                        transition-all duration-200
                        hover:ring-2 hover:ring-emerald-400/50
                        cursor-pointer
                        group/day
                        ${getColor(day.intensity)}
                      `}
                      title={`${day.date.toLocaleDateString()}: ${
                        day.intensity > 0
                          ? `${day.intensity * 25}% activity`
                          : 'No activity'
                      }`}
                    >
                      {/* Tooltip on hover */}
                      <div
                        className={`
                          absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                          px-2 py-1 rounded text-xs text-white
                          bg-gray-900 border border-gray-700
                          whitespace-nowrap pointer-events-none
                          opacity-0 group-hover/day:opacity-100
                          transition-opacity duration-200
                          z-10
                        `}
                      >
                        {day.date.toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 border-t border-gray-700/50 pt-4">
            <span>Less</span>
            <div className="w-3 h-3 rounded bg-gray-800" />
            <div className="w-3 h-3 rounded bg-emerald-900" />
            <div className="w-3 h-3 rounded bg-emerald-700" />
            <div className="w-3 h-3 rounded bg-emerald-500" />
            <div className="w-3 h-3 rounded bg-emerald-400" />
            <span>More</span>
          </div>

          {/* Motivational Message */}
          <div className="mt-6 p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            <p className="text-sm text-gray-300">
              <span className="font-bold text-emerald-400">Keep it up!</span> You're
              on a {currentStreak}-day learning streak. Consistency is key to
              mastering Web3 development. Don't break the chain! 🔥
            </p>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};