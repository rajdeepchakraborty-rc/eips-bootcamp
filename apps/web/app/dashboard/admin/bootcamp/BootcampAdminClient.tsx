"use client";

import { useState } from "react";
import { Plus, Video, Image as ImageIcon, BookOpen, Clock, Tag } from "lucide-react";
import { createModule, createLesson } from "./actions";
import { useRouter } from "next/navigation";

export default function BootcampAdminClient({ initialModules }: { initialModules: any[] }) {
  const router = useRouter();
  const [isCreatingModule, setIsCreatingModule] = useState(false);
  const [isCreatingLessonFor, setIsCreatingLessonFor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCreateModule(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    await createModule({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      xpReward: Number(formData.get("xpReward")),
      duration: formData.get("duration") as string,
      color: formData.get("color") as string,
      orderIndex: Number(formData.get("orderIndex")),
    });

    setLoading(false);
    setIsCreatingModule(false);
    router.refresh();
  }

  async function handleCreateLesson(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isCreatingLessonFor) return;
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    // Store video URL and thumbnail in a JSON object inside the content field for now
    const contentPayload = JSON.stringify({
      videoUrl: formData.get("videoUrl") as string,
      thumbnailUrl: formData.get("thumbnailUrl") as string,
      text: formData.get("content") as string,
    });
    
    await createLesson(isCreatingLessonFor, {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      duration: formData.get("duration") as string,
      content: contentPayload,
      orderIndex: Number(formData.get("orderIndex")),
    });

    setLoading(false);
    setIsCreatingLessonFor(null);
    router.refresh();
  }

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsCreatingModule(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-black font-semibold rounded-lg transition-colors"
        >
          <Plus size={18} />
          Create Module
        </button>
      </div>

      <div className="space-y-6">
        {initialModules.map((module) => (
          <div key={module.id} className="bg-[#0f0f0f] border border-white/5 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className={`w-3 h-3 rounded-full ${module.color}`} />
                  <h2 className="text-lg font-bold text-white">{module.title}</h2>
                </div>
                <p className="text-zinc-400 text-sm">{module.description}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5"><Clock size={14} /> {module.duration}</span>
                <span className="flex items-center gap-1.5"><Tag size={14} /> {module.xpReward} XP</span>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Lessons</h3>
                <button
                  onClick={() => setIsCreatingLessonFor(module.id)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
                >
                  <Plus size={14} /> Add Lesson
                </button>
              </div>

              {module.mappedLessons && module.mappedLessons.length > 0 ? (
                <div className="grid gap-3">
                  {module.mappedLessons.map((lesson: any) => (
                    <div key={lesson.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <div className="flex items-center gap-3">
                        <BookOpen size={16} className="text-zinc-500" />
                        <div>
                          <p className="text-sm font-medium text-white">{lesson.title}</p>
                          <p className="text-xs text-zinc-500">{lesson.description}</p>
                        </div>
                      </div>
                      <div className="text-xs text-zinc-500 font-mono">
                        {lesson.duration}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-zinc-500 text-sm italic">
                  No lessons in this module yet.
                </div>
              )}
            </div>
          </div>
        ))}

        {initialModules.length === 0 && (
          <div className="text-center py-20 border border-white/5 rounded-xl bg-white/[0.01]">
            <BookOpen size={32} className="mx-auto mb-3 text-zinc-600" />
            <h3 className="text-lg font-medium text-white mb-1">No modules found</h3>
            <p className="text-zinc-500 text-sm">Create your first bootcamp module to get started.</p>
          </div>
        )}
      </div>

      {/* CREATE MODULE MODAL */}
      {isCreatingModule && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-lg font-bold">Create New Module</h2>
              <button onClick={() => setIsCreatingModule(false)} className="text-zinc-500 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleCreateModule} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Module Title</label>
                <input required name="title" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="e.g. Ethereum Basics" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Description</label>
                <textarea required name="description" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 min-h-[80px]" placeholder="Brief overview of what students will learn..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">XP Reward</label>
                  <input required name="xpReward" type="number" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="1000" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Duration</label>
                  <input required name="duration" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="2 Weeks" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Theme Color (Tailwind class)</label>
                  <input required name="color" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="bg-blue-500" defaultValue="bg-emerald-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Order Index</label>
                  <input required name="orderIndex" type="number" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" defaultValue="1" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsCreatingModule(false)} className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white">Cancel</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-black text-sm font-bold rounded-lg disabled:opacity-50">
                  {loading ? "Creating..." : "Create Module"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE LESSON MODAL */}
      {isCreatingLessonFor && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-lg font-bold">Add Lesson to Module</h2>
              <button onClick={() => setIsCreatingLessonFor(null)} className="text-zinc-500 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleCreateLesson} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Lesson Title</label>
                <input required name="title" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="e.g. Introduction to Smart Contracts" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Short Description</label>
                <textarea required name="description" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 min-h-[60px]" placeholder="What will students learn in this lesson?" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Duration</label>
                  <input required name="duration" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="e.g. 15 mins" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Order Index</label>
                  <input required name="orderIndex" type="number" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" defaultValue="1" />
                </div>
              </div>

              <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-lg space-y-4">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Media & Content</h4>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 mb-1.5">
                    <Video size={14} /> Video URL (YouTube/Vimeo)
                  </label>
                  <input name="videoUrl" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="https://youtube.com/watch?v=..." />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 mb-1.5">
                    <ImageIcon size={14} /> Thumbnail Image URL
                  </label>
                  <input name="thumbnailUrl" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Markdown Content</label>
                  <textarea name="content" className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 min-h-[120px] font-mono" placeholder="Write additional text instructions in markdown..." />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setIsCreatingLessonFor(null)} className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white">Cancel</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-black text-sm font-bold rounded-lg disabled:opacity-50">
                  {loading ? "Saving..." : "Save Lesson"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
