'use client';

import { useState } from 'react';
import { X, ExternalLink, TrendingUp } from 'lucide-react';
import { getStatusColor } from '@/app/lib/applications';
import type { Application } from '@/app/lib/applications';

interface ApplicationDetailsModalProps {
  application: Application;
  isOpen: boolean;
  onClose: () => void;
}

export function ApplicationDetailsModal({
  application,
  isOpen,
  onClose,
}: ApplicationDetailsModalProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState(application.status);

  const handleApprove = async () => {
    setIsUpdating(true);
    // API call would go here
    setStatus('approved');
    setTimeout(() => setIsUpdating(false), 500);
  };

  const handleReject = async () => {
    setIsUpdating(true);
    // API call would go here
    setStatus('rejected');
    setTimeout(() => setIsUpdating(false), 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      {/* Modal */}
      <div className="bg-white dark:bg-black border border-gray-300 dark:border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white/50 dark:bg-black/50 backdrop-blur-sm border-b border-gray-300 dark:border-white/10 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={application.avatar}
              alt={application.name}
              className="w-12 h-12 rounded-full border border-emerald-500/30 object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-black dark:text-white">{application.name}</h2>
              <p className="text-gray-400 text-sm">{application.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-8 space-y-8">
          {/* Personal Info */}
          <section>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-emerald-400 rounded-full" />
              Personal Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <InfoItem label="Full Name" value={application.name} />
              <InfoItem label="Email" value={application.email} />
              <InfoItem label="College" value={application.college} />
              <InfoItem label="City" value={application.city} />
              <InfoItem label="Track" value={application.track} />
              <InfoItem label="Batch" value={application.batch} />
            </div>
          </section>

          {/* Social Profiles */}
          <section>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center gap-2\">
              <span className="w-1 h-6 bg-emerald-400 rounded-full" />
              Social Profiles
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <SocialLink label="LinkedIn" url={application.linkedin} />
              <SocialLink label="Twitter/X" url={application.twitter} />
              <SocialLink label="GitHub" url={application.github} />
            </div>
          </section>

          {/* Why Join CAP */}
          <section>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-emerald-400 rounded-full" />
              Why Join CAP?
            </h3>
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{application.whyJoinCAP}</p>
            </div>
          </section>

          {/* Community Experience */}
          <section>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-emerald-400 rounded-full" />
              Community Experience
            </h3>
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{application.communityExperience}</p>
            </div>
          </section>

          {/* Referral Metrics */}
          <section>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-emerald-400 rounded-full" />
              Referral Metrics
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <MetricCard
                icon="👥"
                label="Referrals"
                value={application.referralCount}
              />
              <MetricCard
                icon="⚡"
                label="XP Earned"
                value={application.xp}
              />
              <MetricCard
                icon="📊"
                label="Leaderboard Rank"
                value={`#${application.leaderboardRank}`}
              />
            </div>
          </section>

          {/* Current Status */}
          <section>
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-emerald-400 rounded-full" />
              Current Status
            </h3>
            <div className="inline-block">
              <span
                className={`px-4 py-2 rounded-lg text-sm font-semibold border ${getStatusColor(status)}`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
          </section>

          {/* Decision Buttons */}
          {status === 'pending' && (
            <section className="border-t border-gray-300 dark:border-white/10 pt-8">
              <div className="flex gap-4">
                <button
                  onClick={handleApprove}
                  disabled={isUpdating}
                  className="flex-1 px-6 py-3 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-400 font-semibold hover:bg-emerald-500/30 transition-all duration-200 disabled:opacity-50"
                >
                  ✓ Approve Application
                </button>
                <button
                  onClick={handleReject}
                  disabled={isUpdating}
                  className="flex-1 px-6 py-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 font-semibold hover:bg-red-500/30 transition-all duration-200 disabled:opacity-50"
                >
                  ✕ Reject Application
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-sm text-black dark:text-white font-medium">{value}</p>
    </div>
  );
}

function SocialLink({ label, url }: { label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-200 flex items-center justify-between group"
    >
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
      <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors" />
    </a>
  );
}

function MetricCard({ icon, label, value }: { icon: string; label: string; value: string | number }) {
  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{icon}</span>
        <p className="text-xs text-gray-500 uppercase">{label}</p>
      </div>
      <p className="text-2xl font-bold text-black dark:text-white">{value}</p>
    </div>
  );
}