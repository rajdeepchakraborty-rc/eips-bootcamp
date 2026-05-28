// apps/web/components/learning/RecommendedNextStep.tsx

import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

export const RecommendedNextStep: React.FC = () => {
  const recommendation = 'Complete Smart Contract Security next';
  const reason = 'You should finish Module 6 before tackling Advanced Patterns';

  return (
    <div className="relative group h-full">
      <div
        className={`
          relative rounded-2xl
          border border-cyan-500/30
          bg-gradient-to-br from-cyan-500/10 to-cyan-500/5
          backdrop-blur-xl
          p-6
          transition-all duration-300
          hover:border-cyan-500/60
          hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]
          overflow-hidden
          flex flex-col
        `}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br from-cyan-400 to-transparent pointer-events-none" />

        <div className="relative z-10 flex-1 flex flex-col">
          <div className="flex items-start gap-3 mb-6">
            <div className="p-3 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
              <Lightbulb size={20} className="text-cyan-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                Smart Recommendation
              </p>
              <h3 className="text-xl font-bold text-white mt-1">
                Next Step
              </h3>
            </div>
          </div>

          {/* Recommendation Text */}
          <div className="mb-6 flex-1">
            <p className="text-lg font-semibold text-white mb-3">
              {recommendation}
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              {reason}
            </p>
          </div>

          {/* Stats */}
          <div className="mb-6 grid grid-cols-2 gap-4 pt-6 border-t border-gray-700/50">
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">Est. Time</p>
              <p className="text-lg font-bold text-cyan-400">3h 20m</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">XP Reward</p>
              <p className="text-lg font-bold text-cyan-400">250 XP</p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            className={`
              w-full flex items-center justify-center gap-2
              py-3 px-4 rounded-lg font-semibold
              border border-cyan-500/50 hover:border-cyan-500/80
              bg-cyan-500/20 hover:bg-cyan-500/30
              text-cyan-200 hover:text-cyan-100
              transition-all duration-200
            `}
          >
            <span>Start Learning</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};