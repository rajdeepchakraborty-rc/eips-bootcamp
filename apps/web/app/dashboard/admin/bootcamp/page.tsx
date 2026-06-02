import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { apiFetch } from "@/app/lib/api";
import DashboardShell from "@/app/components/dashboard/DashboardShell";
import BootcampAdminClient from "./BootcampAdminClient";

export const metadata = {
  title: "Manage Bootcamp | Admin",
};

export default async function AdminBootcampPage() {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const userRole = (sessionClaims?.metadata as any)?.role || (sessionClaims as any)?.role;
  if (userRole !== 'admin' && userId !== 'user_3EFohPWsEpwDDfFQxcf3i1T39pJ') {
    redirect("/dashboard");
  }

  // Fetch all modules. We pass the admin's userId just to satisfy the endpoint,
  // but we only care about the module data itself.
  let modules = [];
  try {
    modules = await apiFetch(`/bootcamp/modules/${userId}`);
  } catch (error) {
    console.error("Failed to fetch modules:", error);
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight">Bootcamp Management</h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">Create and organize learning modules and lessons.</p>
          </div>
        </div>

        <BootcampAdminClient initialModules={modules} />
      </div>
    </DashboardShell>
  );
}
