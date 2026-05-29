'use client';

import { useState } from 'react';
import { Search, Download, ChevronDown } from 'lucide-react';
import type { FilterState } from '@/app/lib/applications';

interface ApplicationsFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onExport: () => void;
}

const BATCHES = ['All Batches', 'Batch 10', 'Batch 9', 'Batch 8', 'Batch 7'];
const STATUSES = ['All Status', 'Pending', 'Approved', 'Rejected'];
const TRACKS = ['All Tracks', 'Smart Contract', 'Frontend', 'DevOps', 'Blockchain Research'];

export function ApplicationsFilters({
  filters,
  onFilterChange,
  onExport,
}: ApplicationsFiltersProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSearchChange = (value: string) => {
    onFilterChange({ ...filters, search: value });
  };

  const handleStatusChange = (value: string) => {
    const status =
      value === 'All Status'
        ? 'all'
        : (value.toLowerCase() as 'pending' | 'approved' | 'rejected');
    onFilterChange({ ...filters, status });
  };

  const handleBatchChange = (value: string) => {
    onFilterChange({ ...filters, batch: value === 'All Batches' ? 'all' : value });
  };

  const handleTrackChange = (value: string) => {
    onFilterChange({ ...filters, track: value === 'All Tracks' ? 'all' : value });
  };

  return (
    <div className="space-y-4">
      {/* Main filter row */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Left filters */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full lg:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-none sm:min-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search applications..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-emerald-500/50 focus:bg-white/10 focus:outline-none transition-all duration-200 text-sm"
            />
          </div>

          {/* Batch Dropdown */}
          <FilterDropdown
            label="Batch"
            value={
              filters.batch === 'all'
                ? 'All Batches'
                : filters.batch
            }
            options={BATCHES}
            onChange={handleBatchChange}
          />

          {/* Status Dropdown */}
          <FilterDropdown
            label="Status"
            value={
              filters.status === 'all'
                ? 'All Status'
                : filters.status.charAt(0).toUpperCase() + filters.status.slice(1)
            }
            options={STATUSES}
            onChange={handleStatusChange}
          />

          {/* Track Dropdown */}
          <FilterDropdown
            label="Track"
            value={
              filters.track === 'all'
                ? 'All Tracks'
                : filters.track
            }
            options={TRACKS}
            onChange={handleTrackChange}
          />
        </div>

        {/* Right actions */}
        <div className="flex gap-3 items-center w-full lg:w-auto">
          {/* Date Range - simplified for this version */}
          <button
            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition-all duration-200 text-sm flex items-center gap-2 whitespace-nowrap"
          >
            📅 Date Range
          </button>

          {/* Export CSV */}
          <button
            onClick={onExport}
            className="px-4 py-2.5 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 hover:bg-emerald-500/30 transition-all duration-200 text-sm flex items-center gap-2 whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface FilterDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function FilterDropdown({ label, value, options, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition-all duration-200 text-sm flex items-center gap-2 whitespace-nowrap min-w-40"
      >
        <span>{value}</span>
        <ChevronDown className="w-4 h-4 ml-auto" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-black/95 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm z-50">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-sm transition-colors duration-150 ${
                value === option
                  ? 'bg-emerald-500/20 text-emerald-400 border-l-2 border-emerald-500'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}