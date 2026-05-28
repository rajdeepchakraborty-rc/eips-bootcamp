// apps/web/components/learning/SkillAnalytics.tsx

import React from 'react';

interface Skill {
  name: string;
  progress: number;
  category: 'technical' | 'soft';
}

const skills: Skill[] = [
  { name: 'Solidity', progress: 100, category: 'technical' },
  { name: 'Smart Contracts', progress: 95, category: 'technical' },
  { name: 'Web3 JS', progress: 85, category: 'technical' },
  { name: 'Security Audits', progress: 70, category: 'technical' },
  { name: 'Problem Solving', progress: 80, category: 'soft' },
  { name: 'Code Review', progress: 75, category: 'soft' },
];

export const SkillAnalytics: React.FC = () => {
  const technicalSkills = skills.filter((s) => s.category === 'technical');
  const softSkills = skills.filter((s) => s.category === 'soft');

  const avgTechnical = Math.round(
    technicalSkills.reduce((a, b) => a + b.progress, 0) / technicalSkills.length
  );
  const avgSoft = Math.round(
    softSkills.reduce((a, b) => a + b.progress, 0) / softSkills.length
  );

  return (
    <div className="relative group h-full">
      <div
        className={`
          relative rounded-2xl
          border border-pink-500/30
          bg-gradient-to-br from-pink-500/10 to-pink-500/5
          backdrop-blur-xl
          p-6
          transition-all duration-300
          hover:border-pink-500/60
          hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]
          overflow-hidden
          flex flex-col
        `}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br from-pink-400 to-transparent pointer-events-none" />

        <div className="relative z-10 flex-1 flex flex-col">
          <div className="mb-6">
            <p className="text-xs font-semibold text-pink-400 uppercase tracking-wider">
              Progress Tracking
            </p>
            <h3 className="text-2xl font-bold text-white mt-1">
              Skill Analytics
            </h3>
          </div>

          {/* Technical Skills */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-white">Technical Skills</p>
              <p className="text-sm font-bold text-pink-400">{avgTechnical}%</p>
            </div>

            <div className="space-y-3">
              {technicalSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-300">{skill.name}</p>
                    <p className="text-xs text-pink-400 font-bold">
                      {skill.progress}%
                    </p>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700/50">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        skill.progress === 100
                          ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                          : skill.progress > 80
                          ? 'bg-gradient-to-r from-pink-400 to-pink-500'
                          : 'bg-gradient-to-r from-orange-400 to-yellow-400'
                      }`}
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-white">Soft Skills</p>
              <p className="text-sm font-bold text-pink-400">{avgSoft}%</p>
            </div>

            <div className="space-y-3">
              {softSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-300">{skill.name}</p>
                    <p className="text-xs text-pink-400 font-bold">
                      {skill.progress}%
                    </p>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700/50">
                    <div
                      className="h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full transition-all duration-300"
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* View Detailed Analytics Button */}
          <div className="mt-6 pt-4 border-t border-gray-700/50">
            <button
              className={`
                w-full rounded-lg font-medium py-3 px-4
                transition-all duration-200
                border border-pink-500/50 hover:border-pink-500/80
                bg-pink-500/10 hover:bg-pink-500/20
                text-pink-300 hover:text-pink-200
                text-sm
              `}
            >
              Detailed Analytics →
            </button>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};