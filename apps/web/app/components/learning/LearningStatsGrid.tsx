// apps/web/components/learning/LearningStatsGrid.tsx

import React from 'react';
import * as Icons from 'lucide-react';

interface LearningStatCard {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  icon: string;
  color: 'emerald' | 'blue' | 'purple' | 'orange' | 'pink' | 'cyan';
}

const learningStats: LearningStatCard[] = [
  {
    id: 'overall',
    label: 'Overall Progress',
    value: '72',
    unit: '%',
    icon: 'BarChart3',
    color: 'emerald',
  },
  {
    id: 'modules',
    label: 'Modules Completed',
    value: '12',
    unit: '/18',
    icon: 'Layers',
    color: 'blue',
  },
  {
    id: 'assignments',
    label: 'Assignments Submitted',
    value: '8',
    unit: '/12',
    icon: 'CheckCircle',
    color: 'purple',
  },
  {
    id: 'streak',
    label: 'Current Streak',
    value: '5',
    unit: 'days',
    icon: 'Flame',
    color: 'orange',
  },
  {
    id: 'xp',
    label: 'Total XP Earned',
    value: '2,450',
    unit: 'XP',
    icon: 'Zap',
    color: 'pink',
  },
  {
    id: 'rank',
    label: 'Leaderboard Rank',
    value: '#12',
    unit: 'out of 240',
    icon: 'Trophy',
    color: 'cyan',
  },
];

const iconMap: Record<string, React.ComponentType<any>> = {
  BarChart3: Icons.BarChart3,
  Layers: Icons.Layers,
  CheckCircle: Icons.CheckCircle,
  Flame: Icons.Flame,
  Zap: Icons.Zap,
  Trophy: Icons.Trophy,
};

const colorClasses = {
  emerald: {
    bg: 'from-emerald-500/10 to-emerald-500/5',
    border: 'border-emerald-500/30',
    icon: 'text-emerald-400',
    accent: 'text-emerald-400',
    glow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]',
  },
  blue: {
    bg: 'from-blue-500/10 to-blue-500/5',
    border: 'border-blue-500/30',
    icon: 'text-blue-400',
    accent: 'text-blue-400',
    glow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]',
  },
  purple: {
    bg: 'from-purple-500/10 to-purple-500/5',
    border: 'border-purple-500/30',
    icon: 'text-purple-400',
    accent: 'text-purple-400',
    glow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]',
  },
  orange: {
    bg: 'from-orange-500/10 to-orange-500/5',
    border: 'border-orange-500/30',
    icon: 'text-orange-400',
    accent: 'text-orange-400',
    glow: 'hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]',
  },
  pink: {
    bg: 'from-pink-500/10 to-pink-500/5',
    border: 'border-pink-500/30',
    icon: 'text-pink-400',
    accent: 'text-pink-400',
    glow: 'hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]',
  },
  cyan: {
    bg: 'from-cyan-500/10 to-cyan-500/5',
    border: 'border-cyan-500/30',
    icon: 'text-cyan-400',
    accent: 'text-cyan-400',
    glow: 'hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]',
  },
};

export const LearningStatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {learningStats.map((card) => {
        const IconComponent = iconMap[card.icon] || Icons.Activity;
        const colors = colorClasses[card.color];

        return (
          <div key={card.id} className="group h-full">
            <div
              className={`
                relative h-full rounded-2xl
                border ${colors.border}
                bg-gradient-to-br ${colors.bg}
                backdrop-blur-xl
                p-6
                transition-all duration-300
                hover:border-opacity-60
                ${colors.glow}
                overflow-hidden
              `}
            >
              {/* Background gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-400 mb-3">
                    {card.label}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {card.value}
                    </div>
                    {card.unit && (
                      <span className="text-sm text-gray-500">{card.unit}</span>
                    )}
                  </div>
                </div>
                <div
                  className={`
                    p-3 rounded-xl
                    bg-gradient-to-br ${colors.bg}
                    border ${colors.border}
                    ${colors.icon}
                    transition-transform duration-300
                    group-hover:scale-110
                    group-hover:-rotate-6
                  `}
                >
                  <IconComponent size={24} strokeWidth={1.5} />
                </div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </div>
          </div>
        );
      })}
    </div>
  );
};