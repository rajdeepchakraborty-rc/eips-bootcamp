// apps/web/components/learning/LearningActivityFeed.tsx

import React from 'react';
import * as Icons from 'lucide-react';

interface Activity {
  id: string;
  type: 'completed' | 'submitted' | 'earned' | 'rank';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'completed',
    title: 'Module Completed',
    description: 'Solidity Basics - 100%',
    timestamp: '2 hours ago',
    icon: 'CheckCircle',
  },
  {
    id: '2',
    type: 'submitted',
    title: 'Assignment Submitted',
    description: 'Smart Contract Implementation #5',
    timestamp: '5 hours ago',
    icon: 'Send',
  },
  {
    id: '3',
    type: 'earned',
    title: 'XP Earned',
    description: '+250 XP for completing Security module',
    timestamp: '1 day ago',
    icon: 'Zap',
  },
  {
    id: '4',
    type: 'rank',
    title: 'Rank Up',
    description: 'Moved to Rank #12 on the leaderboard',
    timestamp: '2 days ago',
    icon: 'TrendingUp',
  },
  {
    id: '5',
    type: 'completed',
    title: 'Lesson Completed',
    description: 'Web3 Fundamentals - Lesson 3',
    timestamp: '3 days ago',
    icon: 'BookOpen',
  },
];

const iconMap: Record<string, React.ComponentType<any>> = {
  CheckCircle: Icons.CheckCircle,
  Send: Icons.Send,
  Zap: Icons.Zap,
  TrendingUp: Icons.TrendingUp,
  BookOpen: Icons.BookOpen,
};

export const LearningActivityFeed: React.FC = () => {
  return (
    <div className="relative group h-full">
      <div
        className={`
          relative rounded-2xl
          border border-orange-500/30
          bg-gradient-to-br from-orange-500/10 to-orange-500/5
          backdrop-blur-xl
          p-6
          transition-all duration-300
          hover:border-orange-500/60
          hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]
          overflow-hidden
          flex flex-col
        `}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br from-orange-400 to-transparent pointer-events-none" />

        <div className="relative z-10 flex-1 flex flex-col">
          <div className="mb-6">
            <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
              Activity Feed
            </p>
            <h3 className="text-2xl font-bold text-white mt-1">
              Recent Activity
            </h3>
          </div>

          {/* Activity Items */}
          <div className="space-y-4 flex-1">
            {activities.map((activity, index) => {
              const IconComponent = iconMap[activity.icon] || Icons.Activity;
              const isLast = index === activities.length - 1;

              return (
                <div
                  key={activity.id}
                  className={`
                    flex gap-4 pb-4
                    ${!isLast ? 'border-b border-gray-700/50' : ''}
                  `}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                      <IconComponent size={18} className="text-orange-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View All Button */}
          <div className="mt-6 pt-4 border-t border-gray-700/50">
            <button
              className={`
                w-full rounded-lg font-medium py-3 px-4
                transition-all duration-200
                border border-orange-500/50 hover:border-orange-500/80
                bg-orange-500/10 hover:bg-orange-500/20
                text-orange-300 hover:text-orange-200
                text-sm
              `}
            >
              View All Activity →
            </button>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};