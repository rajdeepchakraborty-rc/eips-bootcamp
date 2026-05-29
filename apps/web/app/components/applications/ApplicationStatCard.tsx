'use client';

import { LucideIcon } from 'lucide-react';

export interface ApplicationStatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'emerald' | 'yellow' | 'red' | 'purple';
  growth: string;
  trend: 'up' | 'down';
  subtitle: string;
  loading?: boolean;
}

const colorClasses = {
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    icon: 'text-emerald-400',
    text: 'text-emerald-300',
  },
  yellow: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    icon: 'text-yellow-400',
    text: 'text-yellow-300',
  },
  red: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    icon: 'text-red-400',
    text: 'text-red-300',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    icon: 'text-purple-400',
    text: 'text-purple-300',
  },
};

export function ApplicationStatCard({
  title,
  value,
  icon: Icon,
  color,
  growth,
  trend,
  subtitle,
  loading,
}: ApplicationStatCardProps) {
  const colors = colorClasses[color];

  return (
    <div
      className={`${colors.bg} border ${colors.border} rounded-xl p-5 backdrop-blur-sm hover:border-opacity-60 transition-all duration-300 group`}
    >
      {/* Header with icon */}
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2.5 bg-black/50 rounded-lg border ${colors.border}`}>
          <Icon className={`w-5 h-5 ${colors.icon}`} />
        </div>
        <span className={`text-xs font-semibold ${colors.text}`}>{growth}</span>
      </div>

      {/* Value */}
      <div className="space-y-1 mb-3">
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-white tracking-tight">
          {loading ? (
            <span className="animate-pulse">---</span>
          ) : (
            value
          )}
        </p>
      </div>

      {/* Subtitle */}
      <p className="text-gray-500 text-xs">{subtitle}</p>

      {/* Glow effect on hover */}
      <div
        className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none ${colors.bg}`}
        style={{ filter: 'blur(10px)' }}
      />
    </div>
  );
}