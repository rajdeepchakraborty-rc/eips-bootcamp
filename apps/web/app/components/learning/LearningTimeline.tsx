// apps/web/components/learning/LearningTimeline.tsx

import React from 'react';
import { CheckCircle, Circle, Lock } from 'lucide-react';

interface TimelineModule {
  id: number;
  name: string;
  status: 'completed' | 'current' | 'locked';
}

const timelineModules: TimelineModule[] = [
  { id: 1, name: 'Solidity Basics', status: 'completed' },
  { id: 2, name: 'Smart Contracts', status: 'completed' },
  { id: 3, name: 'Web3 JS', status: 'completed' },
  { id: 4, name: 'Security', status: 'current' },
  { id: 5, name: 'Gas Optimization', status: 'locked' },
  { id: 6, name: 'Advanced Patterns', status: 'locked' },
];

export const LearningTimeline: React.FC = () => {
  return (
    <div className="relative group h-full">
      <div
        className={`
          relative rounded-2xl
          border border-purple-500/30
          bg-gradient-to-br from-purple-500/10 to-purple-500/5
          backdrop-blur-xl
          p-6
          transition-all duration-300
          hover:border-purple-500/60
          hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]
          overflow-hidden
          flex flex-col
        `}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br from-purple-400 to-transparent pointer-events-none" />

        <div className="relative z-10 flex-1 flex flex-col">
          <div className="mb-6">
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
              Learning Roadmap
            </p>
            <h3 className="text-2xl font-bold text-white mt-1">
              Your Timeline
            </h3>
          </div>

          {/* Timeline */}
          <div className="space-y-4 flex-1">
            {timelineModules.map((module, index) => {
              const isLast = index === timelineModules.length - 1;
              let bgColor = 'bg-gray-900/30';
              let borderColor = 'border-gray-700/50';
              let iconColor = 'text-gray-500';

              if (module.status === 'completed') {
                bgColor = 'bg-emerald-500/10';
                borderColor = 'border-emerald-500/30';
                iconColor = 'text-emerald-400';
              } else if (module.status === 'current') {
                bgColor = 'bg-purple-500/20';
                borderColor = 'border-purple-500/50';
                iconColor = 'text-purple-400';
              }

              return (
                <div key={module.id} className="relative">
                  {/* Connector line */}
                  {!isLast && (
                    <div
                      className={`absolute left-5 top-12 w-0.5 h-8 ${
                        module.status === 'completed'
                          ? 'bg-emerald-500/50'
                          : 'bg-gray-700/30'
                      }`}
                    />
                  )}

                  {/* Module item */}
                  <div
                    className={`
                      flex items-start gap-4
                      rounded-lg border px-4 py-3
                      ${bgColor} ${borderColor}
                      transition-all duration-200
                      hover:border-opacity-60
                    `}
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-0.5">
                      {module.status === 'completed' ? (
                        <CheckCircle size={20} className={iconColor} />
                      ) : module.status === 'current' ? (
                        <Circle size={20} className={`${iconColor} fill-current`} />
                      ) : (
                        <Lock size={20} className={iconColor} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">
                        {module.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {module.status === 'completed'
                          ? '✔ Completed'
                          : module.status === 'current'
                          ? '🔄 In Progress'
                          : '🔒 Locked'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};