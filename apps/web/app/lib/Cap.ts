// app/lib/cap.ts

export type CAPStatus = "NOT_APPLIED" | "PENDING" | "APPROVED" | "REJECTED";

export interface CAPApplication {
  id: string;
  fullName: string;
  college: string;
  graduationYear: string;
  city: string;
  socialLinks: string;
  whyJoin: string;
  communityExperience: string;
  status: CAPStatus;
  appliedOn?: string;
  expectedResponse?: string;
}

export interface CAPFormData {
  fullName: string;
  college: string;
  graduationYear: string;
  city: string;
  socialLinks: string;
  whyJoin: string;
  communityExperience: string;
}

// ─── Mock fetch — replace with real API calls ───────────────────────────────

/**
 * Fetch the current user's CAP application.
 * Returns null when the user has never applied.
 */
import { apiFetch } from './api';

type UserRecord = { id: string; clerkId?: string };

async function resolveInternalUserId(clerkId: string): Promise<string | null> {
  try {
    const user = await apiFetch<UserRecord>(`/users/clerk/${clerkId}`);
    return user?.id ?? null;
  } catch {
    return null;
  }
}

export async function fetchCAPApplication(clerkId: string): Promise<CAPApplication | null> {
  try {
    const internalId = await resolveInternalUserId(clerkId);
    if (!internalId) return null;
    const res = await apiFetch<CAPApplication | null>(`/cap/status/${internalId}`);
    return res ?? null;
  } catch (err) {
    return null;
  }
}

/**
 * Submit a new CAP application.
 */
export async function submitCAPApplication(
  clerkId: string,
  data: CAPFormData
): Promise<CAPApplication> {
  const internalId = await resolveInternalUserId(clerkId);
  if (!internalId) throw new Error('User not found');

  const res = await fetch(`http://localhost:4000/cap/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: internalId, ...data }),
  });

  if (!res.ok) {
    throw new Error(`Failed to submit CAP application: ${res.status}`);
  }

  return res.json();
}