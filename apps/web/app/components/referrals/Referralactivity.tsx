import type { ReferralActivity } from "../../lib/referrals";

export default function ReferralActivity({ activities }: { activities?: ReferralActivity[] }) {
  return (
    <div className="p-4 bg-accent rounded border border-border">
      <h3 className="text-sm font-medium text-foreground">Activity</h3>
      <ul className="mt-3 space-y-2 text-sm text-foreground">
        {activities?.slice(0, 6).map((a) => (
          <li key={a.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{a.name}</div>
              <div className="text-xs text-muted-foreground">{a.timestamp}</div>
            </div>
            <div className="text-emerald-400">+{a.xpEarned}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
