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

export async function createModule(data: {
  title: string;
  description: string;
  xpReward: number;
  duration: string;
  color: string;
  orderIndex: number;
}) {
  await verifyAdmin();
  
  try {
    await apiFetch("/bootcamp/modules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    revalidatePath("/dashboard/admin/bootcamp");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createLesson(moduleId: string, data: {
  title: string;
  description: string;
  duration: string;
  content: string; // JSON holding video URL and thumbnail, or markdown
  orderIndex: number;
}) {
  await verifyAdmin();
  
  try {
    await apiFetch(`/bootcamp/modules/${moduleId}/lessons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    revalidatePath("/dashboard/admin/bootcamp");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
