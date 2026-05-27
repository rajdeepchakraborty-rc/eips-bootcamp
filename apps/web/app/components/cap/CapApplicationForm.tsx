"use client";

// app/components/cap/CapApplicationForm.tsx

import React, { useState } from "react";
import { useUser } from '@clerk/nextjs';
import { CAPFormData, submitCAPApplication, CAPApplication } from "../../lib/Cap";

interface Props {
  onSubmitted: (app: CAPApplication) => void;
}

const GRAD_YEARS = ["2024", "2025", "2026", "2027", "2028", "2029"];

export default function CapApplicationForm({ onSubmitted }: Props) {
  const { user } = useUser();
  const [form, setForm] = useState<CAPFormData>({
    fullName: "",
    college: "",
    graduationYear: "2026",
    city: "",
    socialLinks: "",
    whyJoin: "",
    communityExperience: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<CAPFormData>>({});

  const validate = (): boolean => {
    const e: Partial<CAPFormData> = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.college.trim()) e.college = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.whyJoin.trim()) e.whyJoin = "Required";
    if (!form.communityExperience.trim()) e.communityExperience = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
        const userId = user?.id;
        if (!userId) {
          setSubmitting(false);
          return;
        }

        const app = await submitCAPApplication(userId, form);
      onSubmitted(app);
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Form card */}
      <div
        className="relative rounded-2xl border border-white/[0.08] overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(20px)",
          boxShadow:
            "0 0 0 1px rgba(52,211,153,0.08), 0 32px 64px rgba(0,0,0,0.5)",
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(52,211,153,0.6), transparent)",
          }}
        />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Apply to the CAP Program
              </h2>
              <p className="text-sm text-white/40 mt-1">
                Fill in your details to join the ambassador program.
              </p>
            </div>
            <span
              className="text-xs font-medium px-3 py-1 rounded-full border"
              style={{
                background: "rgba(52,211,153,0.12)",
                borderColor: "rgba(52,211,153,0.3)",
                color: "#34d399",
              }}
            >
              Step 1 of 1
            </span>
          </div>

          {/* Fields grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <FieldLabel icon="👤" label="Full Name" />
              <Input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                error={errors.fullName}
              />
            </div>

            {/* College */}
            <div>
              <FieldLabel icon="🏛️" label="College / University" />
              <Input
                name="college"
                value={form.college}
                onChange={handleChange}
                placeholder="Your institution"
                error={errors.college}
              />
            </div>

            {/* Graduation Year */}
            <div>
              <FieldLabel icon="🎓" label="Graduation Year" />
              <div className="relative">
                <select
                  name="graduationYear"
                  value={form.graduationYear}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl text-sm text-white appearance-none outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(52,211,153,0.5)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(52,211,153,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {GRAD_YEARS.map((y) => (
                    <option key={y} value={y} style={{ background: "#0a0a0a" }}>
                      {y}
                    </option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none text-xs">
                  ▼
                </span>
              </div>
            </div>

            {/* City */}
            <div>
              <FieldLabel icon="📍" label="City" />
              <Input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Your city, Country"
                error={errors.city}
              />
            </div>

            {/* Social Links — full width */}
            <div className="sm:col-span-2">
              <FieldLabel
                icon="🔗"
                label="Social Links"
                hint="LinkedIn / Twitter / GitHub / Instagram"
              />
              <Input
                name="socialLinks"
                value={form.socialLinks}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            {/* Why join — full width */}
            <div className="sm:col-span-2">
              <FieldLabel icon="💬" label="Why do you want to join the CAP program?" />
              <Textarea
                name="whyJoin"
                value={form.whyJoin}
                onChange={handleChange}
                maxLength={500}
                placeholder="Share your motivation..."
                error={errors.whyJoin}
              />
            </div>

            {/* Community Experience — full width */}
            <div className="sm:col-span-2">
              <FieldLabel
                icon="👥"
                label="Community Experience"
                hint="Hackathons, Communities, Events, etc."
              />
              <Textarea
                name="communityExperience"
                value={form.communityExperience}
                onChange={handleChange}
                maxLength={500}
                placeholder="Describe your community involvement..."
                error={errors.communityExperience}
              />
            </div>
          </div>

          {/* Notice */}
          <div
            className="mt-6 flex items-start gap-3 rounded-xl px-4 py-3"
            style={{
              background: "rgba(52,211,153,0.06)",
              border: "1px solid rgba(52,211,153,0.15)",
            }}
          >
            <span className="text-emerald-400 mt-0.5 shrink-0">🛡️</span>
            <p className="text-xs text-white/50 leading-relaxed">
              All information will be reviewed by our team. Please provide
              accurate information — our team will review your application.
            </p>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: submitting
                ? "rgba(52,211,153,0.3)"
                : "linear-gradient(135deg, #34d399, #059669)",
              color: "#000",
              boxShadow: submitting
                ? "none"
                : "0 0 24px rgba(52,211,153,0.35), 0 4px 12px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) => {
              if (!submitting)
                e.currentTarget.style.boxShadow =
                  "0 0 36px rgba(52,211,153,0.5), 0 4px 16px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              if (!submitting)
                e.currentTarget.style.boxShadow =
                  "0 0 24px rgba(52,211,153,0.35), 0 4px 12px rgba(0,0,0,0.3)";
            }}
          >
            {submitting ? (
              <>
                <span className="animate-spin text-base">⟳</span>
                Submitting…
              </>
            ) : (
              <>
                Submit Application
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function FieldLabel({
  icon,
  label,
  hint,
}: {
  icon: string;
  label: string;
  hint?: string;
}) {
  return (
    <label className="flex items-center gap-1.5 text-xs text-white/50 mb-2 font-medium">
      <span>{icon}</span>
      {label}
      {hint && <span className="text-white/25">({hint})</span>}
    </label>
  );
}

function Input({
  name,
  value,
  onChange,
  placeholder,
  error,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(52,211,153,0.5)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(52,211,153,0.08)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error
            ? "rgba(239,68,68,0.5)"
            : "rgba(255,255,255,0.1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function Textarea({
  name,
  value,
  onChange,
  maxLength,
  placeholder,
  error,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength: number;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        rows={4}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none resize-none transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(52,211,153,0.5)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(52,211,153,0.08)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error
            ? "rgba(239,68,68,0.5)"
            : "rgba(255,255,255,0.1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
      <div className="flex items-center justify-between mt-1">
        {error ? (
          <p className="text-xs text-red-400">{error}</p>
        ) : (
          <span />
        )}
        <p className="text-xs text-white/25 ml-auto">
          {value.length}/{maxLength}
        </p>
      </div>
    </div>
  );
}