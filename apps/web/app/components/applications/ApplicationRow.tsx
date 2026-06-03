'use client';

import { useState } from 'react';
import { Eye, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { getStatusColor, getTrackColor, getStatusIcon } from '@/app/lib/applications';
import type { Application } from '@/app/lib/applications';

function Avatar({ name, avatarUrl, className }: { name: string; avatarUrl?: string; className?: string }) {
  if (avatarUrl && avatarUrl.trim() !== '') {
    return <img src={avatarUrl} alt={name} className={className} />;
  }
  const initials = name.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase() || 'U';
  const colors = ['bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300', 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300', 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300', 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300', 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300'];
  const idx = name.charCodeAt(0) % colors.length;
  return (
    <div className={`${className} ${colors[idx]} flex items-center justify-center font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}

interface ApplicationRowProps {
  application: Application;
  onViewDetails: (application: Application) => void;
  onStatusChange: () => void;
}

export function ApplicationRow({ application, onViewDetails, onStatusChange }: ApplicationRowProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const formattedDate = new Date(application.appliedDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const time = new Date(application.appliedDate).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleApprove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUpdating(true);
    try {
      await fetch(`/api/admin/applications/${application.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'APPROVED' }),
      });
      onStatusChange();
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReject = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUpdating(true);
    try {
      await fetch(`/api/admin/applications/${application.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'REJECTED' }),
      });
      onStatusChange();
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div 
      onClick={() => onViewDetails(application)}
      className="group relative flex flex-col p-5 bg-accent border border-border rounded-xl hover:bg-accent hover:border-emerald-500/50 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm"
    >
      {/* Background Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Header: Avatar, Info, Status */}
      <div className="flex items-start justify-between mb-4 z-10">
        <div className="flex items-center gap-3 flex-1 min-w-0 pr-4">
          <Avatar
            name={application.name}
            avatarUrl={application.avatar}
            className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-emerald-500/30 object-cover shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-foreground text-base leading-tight truncate">{application.name}</h3>
            <p className="text-xs text-emerald-400 mt-0.5 truncate">{application.email}</p>
          </div>
        </div>
        <div className="flex-shrink-0 flex flex-col items-end gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${getStatusColor(application.status)}`}>
            {getStatusIcon(application.status)}
            {application.status}
          </span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium border ${getTrackColor(application.track)}`}>
            {application.track}
          </span>
        </div>
      </div>

      {/* Body: Location & Batch & Time */}
      <div className="grid grid-cols-2 gap-y-3 mb-5 text-sm text-muted-foreground z-10">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground mb-0.5">Location</span>
          <span className="text-foreground truncate">{application.city}, IN</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground mb-0.5">Batch</span>
          <span className="text-foreground">{application.batch}</span>
        </div>
        <div className="flex flex-col col-span-2">
          <span className="text-xs text-muted-foreground mb-0.5">Applied</span>
          <div className="flex items-center gap-1.5 text-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{formattedDate} at {time}</span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-auto pt-4 border-t border-border flex items-center justify-between gap-2 z-10">
        <button
          onClick={(e) => { e.stopPropagation(); onViewDetails(application); }}
          className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-foreground bg-accent border border-border rounded-lg hover:bg-accent transition-colors"
        >
          <Eye className="w-3.5 h-3.5" /> View
        </button>
        
        {application.status === 'pending' ? (
          <>
            <button
              onClick={handleApprove}
              disabled={isUpdating}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-emerald-100 bg-emerald-500/20 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/40 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all disabled:opacity-50"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Approve
            </button>
            <button
              onClick={handleReject}
              disabled={isUpdating}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-red-100 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/40 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all disabled:opacity-50"
            >
              <XCircle className="w-3.5 h-3.5" /> Reject
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}