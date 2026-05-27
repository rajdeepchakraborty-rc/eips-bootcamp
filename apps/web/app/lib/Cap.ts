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

export async function fetchCAPApplication(clerkId: string): Promise<CAPApplication | null> {
  try {
    const res = await fetch(`/api/cap/status?clerkId=${encodeURIComponent(clerkId)}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    return (await res.json()) as CAPApplication | null;
  } catch {
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
  const res = await fetch(`/api/cap/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clerkId, ...data }),
  });

  if (!res.ok) {
    throw new Error(`Failed to submit CAP application: ${res.status}`);
  }

  return res.json();
}