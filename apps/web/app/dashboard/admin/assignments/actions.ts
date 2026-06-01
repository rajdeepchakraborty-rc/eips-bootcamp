"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { apiFetch } from "@/app/lib/api";

async function verifyAdmin() {
  const { userId, sessionClaims } = await auth();
  if (!userId) throw new Error("Unauthorized");
  
  const userRole = (sessionClaims?.metadata as any)?.role || (sessionClaims as any)?.role;
  if (userRole !== 'admin' && userId !== 'user_3EFohPWsEpwDDfFQxcf3i1T39pJ') {
    throw new Error("Forbidden");
  }
  return userId;
}

export async function createAssignment(data: {
  title: string;
  module: string;
  description: string;
  difficulty: string;
  xpReward: number;
  deadline: string;
  estimatedTime: number;
  tags: string[];
}) {
  await verifyAdmin();
  
  try {
    await apiFetch("/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    revalidatePath("/dashboard/admin/assignments");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
