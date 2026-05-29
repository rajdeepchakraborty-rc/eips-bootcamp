// apps/web/app/components/rewards/RewardsHero.tsx

'use client';

import React from 'react';

export const RewardsHero: React.FC = () => {
  return (
    <div className="relative mb-12 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">🎁</div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Rewards
            </h1>
          </div>

          <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
            Redeem your XP for exclusive rewards and unlock new opportunities.
          </p>
        </div>

        {/* Right Content - Animated Crystal */}
        <div className="relative h-80 lg:h-96 flex items-center justify-center">
          {/* Outer Glow Ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-72 h-72 rounded-full border border-emerald-500/30 opacity-50 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }} />
            <div className="absolute w-60 h-60 rounded-full border border-emerald-400/20 opacity-30 animate-spin" style={{ animationDuration: '12s' }} />
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-emerald-400 opacity-60 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>

          {/* Central Crystal */}
          <div className="relative z-20 flex items-center justify-center">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/40 to-emerald-600/20 rounded-lg blur-3xl" />

              {/* Crystal Container */}
              <div className="relative bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-transparent backdrop-blur-xl border border-emerald-400/40 rounded-2xl p-8 shadow-2xl">
                <div className="text-8xl animate-bounce" style={{ animationDuration: '3s' }}>
                  💎
                </div>
              </div>

              {/* Accent Glows */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-emerald-400/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-emerald-500/15 rounded-full blur-3xl" />
            </div>
          </div>

          {/* Corner Accents */}
          <div className="absolute top-8 right-8 text-emerald-400/40 text-4xl animate-float">✦</div>
          <div className="absolute bottom-8 left-12 text-emerald-400/30 text-3xl animate-float" style={{ animationDelay: '1s' }}>✦</div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-12px) translateX(4px);
            opacity: 0.8;
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};