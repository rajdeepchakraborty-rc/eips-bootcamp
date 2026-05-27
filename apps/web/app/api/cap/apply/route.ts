import { NextResponse } from 'next/server';

const API_BASE = 'http://localhost:4000';

function formatDate(dateInput: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateInput));
}

function addDays(dateInput: string | Date, days: number) {
  const date = new Date(dateInput);
  date.setDate(date.getDate() + days);
  return date;
}

function normalizeApplication(application: { createdAt?: string; [key: string]: unknown }) {
  const appliedAt = application.createdAt ?? new Date().toISOString();
  return {
    ...application,
    appliedOn: formatDate(appliedAt),
    expectedResponse: formatDate(addDays(appliedAt, 7)),
  };
}

async function resolveInternalUserId(clerkId: string) {
  const res = await fetch(`${API_BASE}/users/clerk/${encodeURIComponent(clerkId)}`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;

  return res.json() as Promise<{ id: string } | null>;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { clerkId, ...data } = body as { clerkId?: string; [key: string]: unknown };

  if (!clerkId) {
    return NextResponse.json({ message: 'Missing clerkId' }, { status: 400 });
  }

  const user = await resolveInternalUserId(clerkId);
  if (!user?.id) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const existing = await fetch(`${API_BASE}/cap/status/${user.id}`, {
    cache: 'no-store',
  });

  if (existing.ok) {
    const existingText = await existing.text();
    if (existingText.trim().length > 0) {
      return NextResponse.json(normalizeApplication(JSON.parse(existingText)));
    }
  }

  const res = await fetch(`${API_BASE}/cap/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: user.id, ...data }),
  });

  if (!res.ok) {
    const message = await res.text();
    return NextResponse.json({ message: message || 'Failed to submit CAP application' }, { status: res.status });
  }

  const result = await res.json();
  return NextResponse.json(normalizeApplication(result), { status: 201 });
}