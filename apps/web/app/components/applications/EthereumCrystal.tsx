'use client';

export function EthereumCrystal() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-sm drop-shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Define gradients and filters */}
        <defs>
          <linearGradient id="crystalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.8 }} />
            <stop offset="50%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#047857', stopOpacity: 0.9 }} />
          </linearGradient>

          <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0 }} />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <style>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-10px) rotate(5deg); }
            }
            @keyframes pulse-glow {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 0.8; }
            }
            @keyframes orbit {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes node-pulse {
              0%, 100% { r: 6; opacity: 1; }
              50% { r: 8; opacity: 0.7; }
            }
            .crystal { animation: float 6s ease-in-out infinite; }
            .glow { animation: pulse-glow 4s ease-in-out infinite; }
            .orbital { animation: orbit 20s linear infinite; }
            .node { animation: node-pulse 2s ease-in-out infinite; }
          `}</style>
        </defs>

        {/* Glow background */}
        <circle cx="200" cy="200" r="140" fill="url(#glowGradient)" className="glow" />

        {/* Outer ring */}
        <circle
          cx="200"
          cy="200"
          r="130"
          fill="none"
          stroke="#10b981"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Orbital paths */}
        <g className="orbital">
          {/* Nodes orbit */}
          {[0, 120, 240].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x = 200 + 100 * Math.cos(rad);
            const y = 200 + 100 * Math.sin(rad);
            return (
              <circle
                key={angle}
                cx={x}
                cy={y}
                r="6"
                fill="#10b981"
                opacity="0.8"
                className="node"
                filter="url(#glow)"
              />
            );
          })}
        </g>

        {/* Connection lines to center */}
        {[0, 120, 240].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x = 200 + 100 * Math.cos(rad);
          const y = 200 + 100 * Math.sin(rad);
          return (
            <line
              key={`line-${angle}`}
              x1="200"
              y1="200"
              x2={x}
              y2={y}
              stroke="#10b981"
              strokeWidth="1.5"
              opacity="0.4"
            />
          );
        })}

        {/* Central Crystal (Diamond shape) */}
        <g className="crystal">
          {/* Main crystal body */}
          <polygon
            points="200,100 280,200 200,300 120,200"
            fill="url(#crystalGradient)"
            stroke="#10b981"
            strokeWidth="2"
            filter="url(#glow)"
          />

          {/* Crystal facets */}
          <polygon points="200,100 240,150 200,200 160,150" fill="#10b981" opacity="0.6" />
          <polygon points="200,200 240,250 200,300 160,250" fill="#10b981" opacity="0.4" />
          <polygon points="120,200 160,150 200,200 160,250" fill="#10b981" opacity="0.5" />
          <polygon points="200,200 240,250 280,200 240,150" fill="#10b981" opacity="0.3" />

          {/* Inner glow */}
          <circle cx="200" cy="200" r="40" fill="#10b981" opacity="0.2" filter="url(#glow)" />
        </g>

        {/* Aura rings */}
        <circle
          cx="200"
          cy="200"
          r="95"
          fill="none"
          stroke="#10b981"
          strokeWidth="1"
          opacity="0.2"
          strokeDasharray="5,5"
        />
        <circle
          cx="200"
          cy="200"
          r="115"
          fill="none"
          stroke="#10b981"
          strokeWidth="1"
          opacity="0.15"
          strokeDasharray="3,3"
        />
      </svg>

      {/* Subtle glow effect behind */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}