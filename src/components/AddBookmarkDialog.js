"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";

const categories = ["Tech", "Study", "Fun"];

export default function AddBookmarkDialog({ onAdded }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("Tech");
  const [open, setOpen] = useState(false);

  async function handleAdd() {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    await supabase.from("bookmarks").insert({
      title,
      url,
      category,
      user_id: userData.user.id,
    });

    setTitle("");
    setUrl("");
    setCategory("Tech");
    onAdded();
  }

  return (
    <div className="bg-[#241a44] border border-[#3a2b66] rounded-3xl p-8 shadow-xl space-y-4">
      <Input
        placeholder="Bookmark title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="bg-[#1b1430] border-[#3a2b66] text-[#f3efff]"
      />

      <Input
        placeholder="https://example.com"
        value={url}
        onChange={e => setUrl(e.target.value)}
        className="bg-[#1b1430] border-[#3a2b66] text-[#f3efff]"
      />

      {/* CUSTOM DROPDOWN */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-full bg-[#1b1430] border border-[#3a2b66] text-left px-3 py-2 rounded-xl text-[#f3efff] focus:ring-2 focus:ring-[#6d4aff]"
        >
          {category}
        </button>

        {open && (
          <div className="absolute mt-2 w-full bg-[#241a44] border border-[#3a2b66] rounded-xl overflow-hidden shadow-lg z-50">
            {categories.map(cat => (
              <div
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setOpen(false);
                }}
                className="px-4 py-2 cursor-pointer text-[#f3efff]
                hover:bg-[#6d4aff] hover:text-white transition"
              >
                {cat}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleAdd}
        className="w-full mt-4 rounded-xl py-2.5 bg-[#6d4aff] text-white font-medium hover:bg-[#7b5cff]"
      >
        Add Bookmark
      </button>
    </div>
  );
}
