// apps/web/components/learning/LearningProgressWidget.tsx

import React from 'react';

interface ModuleProgress {
  name: string;
  progress: number;
}

const moduleProgress: ModuleProgress[] = [
  { name: 'Solidity Basics', progress: 100 },
  { name: 'Smart Contracts', progress: 100 },
  { name: 'Web3 JS', progress: 90 },
  { name: 'Security', progress: 75 },
  { name: 'Gas Optimization', progress: 45 },
  { name: 'Advanced Patterns', progress: 0 },
];

export const LearningProgressWidget: React.FC = () => {
  const completedAssignments = 8;
  const totalAssignments = 12;
  const assignmentCompletion = (completedAssignments / totalAssignments) * 100;

  return (
    <div className="relative group h-full">
      <div
        className={`
          relative rounded-2xl
          border border-blue-500/30
          bg-gradient-to-br from-blue-500/10 to-blue-500/5
          backdrop-blur-xl
          p-6
          transition-all duration-300
          hover:border-blue-500/60
          hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]
          overflow-hidden
          flex flex-col
        `}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br from-blue-400 to-transparent pointer-events-none" />

        <div className="relative z-10 flex-1 flex flex-col">
          <div className="mb-6">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Learning Progress
            </p>
            <h3 className="text-2xl font-bold text-white mt-1">
              Module Breakdown
            </h3>
          </div>

          {/* Module Progress Bars */}
          <div className="space-y-4 mb-6 flex-1">
            {moduleProgress.map((module) => (
              <div key={module.name}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-300">{module.name}</p>
                  <p className="text-xs text-blue-400 font-bold">{module.progress}%</p>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700/50">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      module.progress === 100
                        ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                        : module.progress > 50
                        ? 'bg-gradient-to-r from-blue-400 to-cyan-400'
                        : 'bg-gradient-to-r from-orange-400 to-yellow-400'
                    }`}
                    style={{ width: `${module.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Assignment Completion */}
          <div className="pt-6 border-t border-gray-700/50">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-3">
              Assignment Completion
            </p>
            <div className="flex items-baseline gap-2 mb-2">
              <p className="text-3xl font-bold text-blue-400">
                {completedAssignments}/{totalAssignments}
              </p>
              <p className="text-sm text-gray-400">submitted</p>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700/50">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${assignmentCompletion}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};