"use client";

import { useState } from "react";
import { Plus, FileText, Calendar, Tag as TagIcon, Signal } from "lucide-react";
import { createAssignment } from "./actions";
import { useRouter } from "next/navigation";

export default function AssignmentsAdminClient({ initialAssignments }: { initialAssignments: any[] }) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const tagsString = formData.get("tags") as string;
    const tags = tagsString ? tagsString.split(",").map(t => t.trim()).filter(Boolean) : [];
    
    await createAssignment({
      title: formData.get("title") as string,
      module: formData.get("module") as string,
      description: formData.get("description") as string,
      difficulty: formData.get("difficulty") as string,
      xpReward: Number(formData.get("xpReward")),
      deadline: formData.get("deadline") as string,
      estimatedTime: Number(formData.get("estimatedTime")),
      tags,
    });

    setLoading(false);
    setIsCreating(false);
    router.refresh();
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-black font-semibold rounded-lg transition-colors"
        >
          <Plus size={18} />
          Create Assignment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {initialAssignments.map((assignment) => (
          <div key={assignment.id} className="bg-[#0f0f0f] border border-white/5 rounded-xl overflow-hidden flex flex-col h-full">
            <div className="p-5 flex-1">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {assignment.module}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/5 text-zinc-300 border border-white/10">
                  {assignment.xpReward} XP
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{assignment.title}</h3>
              <p className="text-sm text-zinc-400 line-clamp-3 mb-4">{assignment.description}</p>
              
              {assignment.tags && assignment.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {assignment.tags.map((tag: string) => (
                    <span key={tag} className="text-xs text-zinc-500 bg-black px-2 py-1 rounded">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 bg-white/[0.02] border-t border-white/5 grid grid-cols-2 gap-3 text-xs text-zinc-500">
              <div className="flex items-center gap-1.5"><Signal size={14} /> {assignment.difficulty}</div>
              <div className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(assignment.deadline).toLocaleDateString()}</div>
              <div className="flex items-center gap-1.5"><Clock size={14} /> {assignment.estimatedTime} hours</div>
            </div>
          </div>
        ))}
        
        {initialAssignments.length === 0 && (
          <div className="col-span-full text-center py-20 border border-white/5 rounded-xl bg-white/[0.01]">
            <FileText size={32} className="mx-auto mb-3 text-zinc-600" />
            <h3 className="text-lg font-medium text-white mb-1">No assignments found</h3>
            <p className="text-zinc-500 text-sm">Create your first assignment for the bootcamp.</p>
          </div>
        )}
      </div>

      {isCreating && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-xl w-full max-w-xl overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-lg font-bold">Create New Assignment</h2>
              <button onClick={() => setIsCreating(false)} className="text-zinc-500 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleCreate} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Assignment Title</label>
                <input required name="title" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="e.g. Build an ERC20 Token" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Module Name / ID</label>
                <input required name="module" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="e.g. Ethereum Basics" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Description (Supports Markdown)</label>
                <textarea required name="description" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 min-h-[100px]" placeholder="Detailed instructions for the assignment..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Difficulty</label>
                  <select required name="difficulty" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">XP Reward</label>
                  <input required name="xpReward" type="number" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Deadline</label>
                  <input required name="deadline" type="datetime-local" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Estimated Time (Hours)</label>
                  <input required name="estimatedTime" type="number" step="0.5" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="2.5" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Tags (comma-separated)</label>
                <input name="tags" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="solidity, frontend, react" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white">Cancel</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-black text-sm font-bold rounded-lg disabled:opacity-50">
                  {loading ? "Creating..." : "Create Assignment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple clock icon fallback
function Clock(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
