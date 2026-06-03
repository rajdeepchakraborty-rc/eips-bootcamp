
'use client';

import { Clock, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUpcomingDeadlines } from '@/app/actions/dashboard';

export function EventsCard() {
  const [deadlines, setDeadlines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUpcomingDeadlines().then((data) => {
      setDeadlines(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-foreground font-bold text-base">Upcoming Deadlines</h3>
        <button className="text-emerald-400 text-xs font-semibold hover:text-emerald-300 transition-colors">
          View All
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-emerald-500 border-opacity-50"></div>
          </div>
        ) : deadlines.length === 0 ? (
          <div className="bg-background/20 border border-border rounded-xl p-6 text-center">
            <Clock size={20} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-foreground font-semibold text-sm">No upcoming deadlines</p>
            <p className="text-muted-foreground text-xs mt-1">You are all caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {deadlines.map((d) => (
              <div key={d.id} className="bg-accent border border-border rounded-lg p-3 flex gap-3 items-center">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                  <Calendar size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground truncate max-w-[180px]">{d.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Due: {new Date(d.deadline).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsCard;
