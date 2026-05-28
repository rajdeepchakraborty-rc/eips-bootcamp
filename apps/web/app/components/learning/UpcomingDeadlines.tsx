// apps/web/components/learning/UpcomingDeadlines.tsx

import React from 'react';
import { Calendar, AlertCircle, Clock } from 'lucide-react';

interface Deadline {
  id: string;
  title: string;
  dueDate: string;
  daysLeft: number;
  priority: 'high' | 'medium' | 'low';
  type: string;
}

const deadlines: Deadline[] = [
  {
    id: '1',
    title: 'Assignment #5: Smart Contracts',
    dueDate: 'May 30, 2024',
    daysLeft: 2,
    priority: 'high',
    type: 'Assignment',
  },
  {
    id: '2',
    title: 'Quiz: Web3 Fundamentals',
    dueDate: 'June 2, 2024',
    daysLeft: 5,
    priority: 'medium',
    type: 'Quiz',
  },
  {
    id: '3',
    title: 'Project: Build EIP Proposal',
    dueDate: 'June 10, 2024',
    daysLeft: 13,
    priority: 'medium',
    type: 'Project',
  },
  {
    id: '4',
    title: 'Code Review Submission',
    dueDate: 'June 15, 2024',
    daysLeft: 18,
    priority: 'low',
    type: 'Review',
  },
];

export const UpcomingDeadlines: React.FC = () => {
  return (
    <div className="relative group h-full">
      <div
        className={`
          relative rounded-2xl
          border border-red-500/30
          bg-gradient-to-br from-red-500/10 to-red-500/5
          backdrop-blur-xl
          p-6
          transition-all duration-300
          hover:border-red-500/60
          hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]
          overflow-hidden
          flex flex-col
        `}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br from-red-400 to-transparent pointer-events-none" />

        <div className="relative z-10 flex-1 flex flex-col">
          <div className="mb-6">
            <p className="text-xs font-semibold text-red-400 uppercase tracking-wider">
              Timeline
            </p>
            <h3 className="text-2xl font-bold text-white mt-1">
              Upcoming Deadlines
            </h3>
          </div>

          {/* Deadline Items */}
          <div className="space-y-4 flex-1">
            {deadlines.map((deadline) => {
              let priorityColor = 'bg-gray-500/20 text-gray-300 border-gray-500/30';
              let dayColor = 'text-gray-400';

              if (deadline.priority === 'high') {
                priorityColor = 'bg-red-500/20 text-red-300 border-red-500/30';
                dayColor = 'text-red-400';
              } else if (deadline.priority === 'medium') {
                priorityColor = 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
                dayColor = 'text-yellow-400';
              } else {
                priorityColor = 'bg-green-500/20 text-green-300 border-green-500/30';
                dayColor = 'text-green-400';
              }

              return (
                <div
                  key={deadline.id}
                  className={`
                    rounded-lg border border-gray-700/50
                    bg-gray-900/30 hover:bg-gray-900/50
                    p-4 transition-all duration-200
                    group/deadline
                  `}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {deadline.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {deadline.type}
                      </p>
                    </div>
                    <span
                      className={`
                        text-xs font-medium px-3 py-1 rounded-md border
                        whitespace-nowrap
                        ${priorityColor}
                      `}
                    >
                      {deadline.priority.charAt(0).toUpperCase() +
                        deadline.priority.slice(1)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar size={14} />
                      <span>{deadline.dueDate}</span>
                    </div>
                    <div className={`flex items-center gap-1 font-bold ${dayColor}`}>
                      <Clock size={14} />
                      <span>{deadline.daysLeft}d</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View All Button */}
          <div className="mt-6 pt-4 border-t border-gray-700/50">
            <button
              className={`
                w-full rounded-lg font-medium py-3 px-4
                transition-all duration-200
                border border-red-500/50 hover:border-red-500/80
                bg-red-500/10 hover:bg-red-500/20
                text-red-300 hover:text-red-200
                text-sm
              `}
            >
              View Calendar →
            </button>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};