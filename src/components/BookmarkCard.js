"use client";

import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function BookmarkCard({ bookmark, onDelete }) {
  async function handleDelete() {
    await supabase.from("bookmarks").delete().eq("id", bookmark.id);
    onDelete();
  }

  return (
    <div className="bg-[#241a44] border border-[#3a2b66] rounded-2xl p-5 flex justify-between items-center hover:bg-[#2d2060] transition">
      <div className="space-y-1">
        <p className="text-sm font-medium text-[#f3efff]">
          {bookmark.title}
        </p>

        <a
          href={bookmark.url}
          target="_blank"
          className="text-sm text-[#cfc6ff] hover:text-[#ffffff] underline-offset-2 hover:underline break-all"
        >
          {bookmark.url}
        </a>

        <span className="inline-block text-xs px-2.5 py-0.5 rounded-md bg-[#3a2b66] text-[#d8d1ff]">
          {bookmark.category}
        </span>
      </div>

      <Button
        variant="ghost"
        onClick={handleDelete}
        className="text-[#b8adff] hover:text-red-400 hover:bg-red-500/10"
      >
        Delete
      </Button>
    </div>
  );
}
