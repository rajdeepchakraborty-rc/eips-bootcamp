import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const UpcomingDeadlines = ({ deadlines }: { deadlines?: any[] }) => {
  const items = deadlines || [];

  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex flex-col h-full hover:border-emerald-500/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-foreground font-bold text-base">Upcoming Deadlines</h3>
      </div>

      <div className="flex-1">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-6">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-3">
              <Calendar size={20} className="text-muted-foreground" />
            </div>
            <p className="text-foreground font-semibold text-sm mb-1">No upcoming deadlines</p>
            <p className="text-muted-foreground text-xs">You're all caught up on assignments!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="group flex gap-4 p-4 bg-white/[0.02] border border-border rounded-xl hover:bg-white/[0.04] hover:border-emerald-500/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase leading-none mb-1">Due</span>
                  <span className="text-xs font-black text-foreground leading-none">{item.deadline.split('/')[1] || item.deadline}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-emerald-400 font-semibold mb-0.5 truncate">{item.module}</p>
                      <h4 className="text-sm font-bold text-foreground leading-tight line-clamp-1 group-hover:text-emerald-300 transition-colors">{item.title}</h4>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <Link href={`/dashboard/assignments/${item.id}`} className="text-xs font-semibold text-muted-foreground hover:text-emerald-400 transition-colors flex items-center gap-1">
                      Go to Assignment <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};