import { apiFetch } from './api';

type User = {
  id: string;
  email: string;
  clerkId: string;
  username: string;
  role: string;
};

type ReferralResponse = {
  referrals: {
    id: string;
  }[];
  totalXP: number;
};

type CapResponse = {
  status: string;
};

type LeaderboardEntry = {
  userId: string;
  _sum: {
    amount: number;
  };
};

type DashboardData = {
  user: User;
  xp: number;
  referralsCount: number;
  capStatus: string;
  rank: number | null;
  leaderboard: LeaderboardEntry[];
};

function createFallbackDashboardData(clerkId: string): DashboardData {
  return {
    user: {
      id: clerkId,
      email: '',
      clerkId,
      username: 'Explorer',
      role: 'Student',
    },
    xp: 0,
    referralsCount: 0,
    capStatus: 'NOT APPLIED',
    rank: null,
    leaderboard: [],
  };
}

export async function getDashboardData(clerkId: string) {
  try {
    const user = await apiFetch<User>(`/users/clerk/${clerkId}`);

    if (!user?.id) {
      return createFallbackDashboardData(clerkId);
    }

    const [referrals, cap, leaderboard] = await Promise.all([
      apiFetch<ReferralResponse>(`/referrals/${user.id}`),
      apiFetch<CapResponse>(`/cap/status/${user.id}`),
      apiFetch<LeaderboardEntry[]>(`/referrals/leaderboard/all`),
    ]);

    const rank = leaderboard.findIndex(
      (entry) => entry.userId === user.id
    ) + 1;

    return {
      user,
      xp: referrals.totalXP,
      referralsCount: referrals.referrals.length,
      capStatus: cap?.status || 'NOT APPLIED',
      rank: rank || null,
      leaderboard,
    };
  } catch {
    return createFallbackDashboardData(clerkId);
  }
}