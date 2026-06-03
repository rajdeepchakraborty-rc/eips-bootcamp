'use client';

import { Users } from 'lucide-react';
import { EthereumCrystal } from '@/app/components/applications/EthereumCrystal';

export function ApplicationsHero() {
  return (
    <div className="relative overflow-hidden border-b border-border px-6 lg:px-8 py-12 lg:py-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
              <Users className="w-6 h-6 text-emerald-400" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground via-emerald-500 to-emerald-400 bg-clip-text text-transparent">
              Applications
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Review and manage Campus Ambassador applications.
          </p>
        </div>

        {/* Right Visualization */}
        <div className="relative h-64 lg:h-80 flex items-center justify-center">
          <EthereumCrystal />
        </div>
      </div>
    </div>
  );
}