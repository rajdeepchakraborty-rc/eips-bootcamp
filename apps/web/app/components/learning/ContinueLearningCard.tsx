// apps/web/components/learning/ContinueLearningCard.tsx

import React from 'react';
import { Play, Clock, Zap } from 'lucide-react';

export const ContinueLearningCard: React.FC = () => {
  const moduleTitle = 'Module: Writing & Improving EIPs';
  const description = 'Learn how to write clear EIP specifications and add ethereum details';
  const progress = 75;
  const estimatedTime = '2h 30m';
  const difficulty = 'Intermediate';

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
        {/* Background animation */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br from-emerald-400 to-transparent pointer-events-none" />

        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left: Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                  Continue Learning
                </p>
                <h2 className="text-3xl font-bold text-white mb-3">
                  {moduleTitle}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-300">Progress</span>
                  <span className="text-emerald-400 font-bold">{progress}%</span>
                </div>
                <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-emerald-500/30">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock size={16} className="text-emerald-400" />
                  <span>{estimatedTime} remaining</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Zap size={16} className="text-emerald-400" />
                  <span>{difficulty} difficulty</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                className={`
                  inline-flex items-center gap-2
                  px-8 py-4 rounded-lg font-semibold
                  border border-emerald-500/50 hover:border-emerald-500/80
                  bg-emerald-500/20 hover:bg-emerald-500/30
                  text-emerald-200 hover:text-emerald-100
                  transition-all duration-200
                  group/btn
                `}
              >
                <Play size={20} />
                <span>Resume Lesson</span>
              </button>
            </div>

            {/* Right: Ethereum Illustration */}
            <div className="relative h-64 lg:h-full hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-xl border border-emerald-500/20 overflow-hidden flex items-center justify-center">
                {/* Animated shapes */}
                <div className="absolute top-8 left-8 w-24 h-24 bg-emerald-400/10 rounded-full blur-2xl animate-pulse" />
                <div className="absolute bottom-8 right-8 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                
                {/* Ethereum symbol */}
                <div className="relative text-6xl font-bold text-emerald-400/30">Ξ</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};