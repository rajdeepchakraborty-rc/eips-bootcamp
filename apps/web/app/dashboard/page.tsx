import { currentUser } from '@clerk/nextjs/server';
import { DashboardShell } from '@/app/components/dashboard/DashboardShell';
import { WelcomeHero } from '@/app/components/dashboard/WelcomeHero';
import { StatsGrid } from '@/app/components/dashboard/StatsGrid';
import { ReferralCard } from '@/app/components/dashboard/ReferralCard';
import { LeaderboardPreview } from '@/app/components/dashboard/LeaderboardPreview';
import { ActivityFeed } from '@/app/components/dashboard/ActivityFeed';
import { LearningProgress } from '@/app/components/dashboard/LearningProgress';
import { EventsCard } from '@/app/components/dashboard/EventsCard';
import { ProgressWidget } from '@/app/components/dashboard/ProgressWidget';
import { getDashboardData } from '@/app/lib/dashboard';

export default async function DashboardPage() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return <div>Please sign in</div>;
  }

  const dashboard = await getDashboardData(clerkUser.id);
  const displayName =
    clerkUser.firstName ??
    clerkUser.username ??
    clerkUser.fullName ??
    clerkUser.emailAddresses[0]?.emailAddress?.split('@')[0] ??
    dashboard.user.username;

  return (
    <DashboardShell>
      <div className="space-y-5">
        <WelcomeHero
          user={{
            username: displayName,
            role: dashboard.user.role,
          }}
        />

        <StatsGrid
          xp={dashboard.xp}
          referralsCount={dashboard.referralsCount}
          capStatus={dashboard.capStatus}
          rank={dashboard.rank}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <ReferralCard
            referralsCount={dashboard.referralsCount}
            xp={dashboard.xp}
          />

          <LeaderboardPreview leaderboard={dashboard.leaderboard} />

          <ActivityFeed />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <LearningProgress />
          <EventsCard />
          <ProgressWidget />
        </div>
      </div>
    </DashboardShell>
  );
}