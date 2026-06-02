import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { apiFetch } from "@/app/lib/api";
import DashboardShell from "@/app/components/dashboard/DashboardShell";
import AssignmentsAdminClient from "./AssignmentsAdminClient";

export const metadata = {
  title: "Manage Assignments | Admin",
};

export default async function AdminAssignmentsPage() {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const userRole = (sessionClaims?.metadata as any)?.role || (sessionClaims as any)?.role;
  if (userRole !== 'admin' && userId !== 'user_3EFohPWsEpwDDfFQxcf3i1T39pJ') {
    redirect("/dashboard");
  }

  let assignments = [];
  try {
    // Fetch all assignments. The endpoint `GET /assignments/:userId` returns all assignments
    // and the progress for that specific user. We can just use the admin's ID to fetch the list.
    const response = await apiFetch(`/assignments/${userId}`);
    assignments = (response as any).assignments || [];
  } catch (error) {
    console.error("Failed to fetch assignments:", error);
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Assignments Management</h1>
            <p className="text-zinc-400 text-sm">Create and organize student assignments and challenges.</p>
          </div>
        </div>

        <AssignmentsAdminClient initialAssignments={assignments} />
      </div>
    </DashboardShell>
  );
}
