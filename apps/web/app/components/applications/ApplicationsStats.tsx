'use client';

import { ApplicationStatCard, type ApplicationStatCardProps } from '@/app/components/applications/ApplicationStatCard';
import { Users, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import type { ApplicationStats } from '@/app/lib/applications';

interface ApplicationsStatsProps {
  stats: ApplicationStats;
  loading: boolean;
}

export function ApplicationsStats({ stats, loading }: ApplicationsStatsProps) {
  const cardData: Array<Omit<ApplicationStatCardProps, 'loading'>> = [
    {
      title: 'Total Applications',
      value: stats.total,
      icon: Users,
      color: 'emerald',
      growth: '+18.6%',
      trend: 'up',
      subtitle: 'All submissions',
    },
    {
      title: 'Pending Review',
      value: stats.pending,
      icon: Clock,
      color: 'yellow',
      growth: '+12.4%',
      trend: 'up',
      subtitle: 'Awaiting decision',
    },
    {
      title: 'Approved',
      value: stats.approved,
      icon: CheckCircle,
      color: 'emerald',
      growth: '+20.1%',
      trend: 'up',
      subtitle: 'Accepted applications',
    },
    {
      title: 'Rejected',
      value: stats.rejected,
      icon: XCircle,
      color: 'red',
      growth: '+8.3%',
      trend: 'up',
      subtitle: 'Rejected applications',
    },
    {
      title: 'Acceptance Rate',
      value: `${stats.acceptanceRate}%`,
      icon: TrendingUp,
      color: 'purple',
      growth: '+9.8%',
      trend: 'up',
      subtitle: 'Approval percentage',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cardData.map((card, index) => (
        <ApplicationStatCard
          key={index}
          {...card}
          loading={loading}
        />
      ))}
    </div>
  );
}