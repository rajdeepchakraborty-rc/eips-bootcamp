import { ActivityItem } from '../../lib/dashboard';
import { User, Users, Star, ShieldCheck } from 'lucide-react';

const iconConfig: Record<ActivityItem['icon'], { icon: React.ReactNode; bg: string }> = {
  profile: {
    icon: <User size={15} />,
    bg: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  },
  referral: {
    icon: <Users size={15} />,
    bg: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  },
  xp: {
    icon: <Star size={15} />,
    bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  },
  cap: {
    icon: <ShieldCheck size={15} />,
    bg: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  },
};

export function ActivityFeed({ activities }: { activities: ActivityItem[] }) {
  return (
    <div className="bg-gradient-to-br from-slate-100/90 via-slate-200/70 to-slate-300/50
      dark:from-slate-800/80 dark:via-slate-900/60 dark:to-slate-900/40 
      border border-border rounded-2xl p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-foreground font-bold text-base">Recent Activity</h3>
        <button className="text-emerald-400 text-xs font-semibold hover:text-emerald-300 transition-colors">
          View All
        </button>
      </div>

      <ul className="space-y-3.5">
        {activities.length > 0 ? (
          activities.map((item) => {
          const { icon, bg } = iconConfig[item.icon];
          return (
            <li key={item.id} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${bg}`}>
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-foreground text-sm font-semibold leading-tight">{item.title}</p>
                  <span className="text-muted-foreground text-[10px] font-medium flex-shrink-0 mt-0.5">{item.time}</span>
                </div>
                <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">{item.description}</p>
              </div>
            </li>
          );
        })
        ) : (
          <li className="text-center text-muted-foreground text-xs py-4">No recent activity</li>
        )}
      </ul>
    </div>
  );
}

export default ActivityFeed;
