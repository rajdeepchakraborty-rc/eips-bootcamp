// apps/web/app/learning/page.tsx

'use client';

import { useUser } from '@clerk/nextjs';
import { DashboardShell } from '@/app/components/dashboard/DashboardShell';
import { LearningHero } from '@/app/components/learning/LearningHero';
import { LearningStatsGrid } from '@/app/components/learning/LearningStatsGrid';
import { ContinueLearningCard } from '@/app/components/learning/ContinueLearningCard';
import { LearningProgressWidget } from '@/app/components/learning/LearningProgressWidget';
import { LearningTimeline } from '@/app/components/learning/LearningTimeline';
import { RecommendedNextStep } from '@/app/components/learning/RecommendedNextStep';
import { LearningActivityFeed } from '@/app/components/learning/LearningActivityFeed';
import { UpcomingDeadlines } from '@/app/components/learning/UpcomingDeadlines';
import { AchievementBadges } from '@/app/components/learning/AchievementBadges';
import { SkillAnalytics } from '@/app/components/learning/SkillAnalytics';
import { LearningStreak } from '@/app/components/learning/LearningStreak';

export default function LearningPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-2 border-emerald-500/30 border-t-emerald-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading learning page...</p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  const displayName = user?.firstName || 'User';

  return (
    <DashboardShell >
      {/* Hero Section */}
      <section className="mb-10">
        <LearningHero userName={displayName} />
      </section>

      {/* Learning Stats Grid */}
      <section className="mb-10">
        <LearningStatsGrid />
      </section>

      {/* Continue Learning Featured Card */}
      <section className="mb-10">
        <ContinueLearningCard />
      </section>

      {/* Progress + Timeline + Next Step */}
      <section className="mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <LearningProgressWidget />
          <LearningTimeline />
          <RecommendedNextStep />
        </div>
      </section>

      {/* Activity + Deadlines */}
      <section className="mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LearningActivityFeed />
          <UpcomingDeadlines />
        </div>
      </section>

      {/* Achievements + Skills */}
      <section className="mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AchievementBadges />
          <SkillAnalytics />
        </div>
      </section>

      {/* Learning Streak */}
      <section>
        <LearningStreak />
      </section>
    </DashboardShell>
  );
}