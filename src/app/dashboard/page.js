"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import AddBookmarkDialog from "@/components/AddBookmarkDialog";
import BookmarkCard from "@/components/BookmarkCard";

export default function DashboardPage() {
  const router = useRouter();

  const [bookmarks, setBookmarks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      router.push("/login");
      return;
    }
    fetchBookmarks();
  }

  async function fetchBookmarks() {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setBookmarks(data || []);
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const filteredBookmarks =
    filter === "All"
      ? bookmarks
      : bookmarks.filter(b => b.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1b1430] via-[#211742] to-[#261a55] text-[#e9e4ff]">
      
      <div className="bg-[#241a44] border-b border-[#3a2b66]">
        <div className="max-w-5xl mx-auto px-8 py-4 flex items-center">
          <h1 className="text-2xl font-semibold text-[#f3efff]">
            My Bookmarks
          </h1>

          <button
            onClick={handleLogout}
            className="ml-auto bg-[#6d4aff] text-white px-4 py-2 rounded-xl hover:bg-[#7b5cff] transition shadow-md"
          >
            Logout
          </button>
        </div>
      </div>

     
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-12">
          <AddBookmarkDialog onAdded={fetchBookmarks} />
        </div>

    
        <div className="flex gap-3 mb-10">
  {["All", "Tech", "Study", "Fun"].map(cat => (
    <button
      key={cat}
      onClick={() => setFilter(cat)}
      className={`px-4 py-1.5 rounded-full text-sm transition ${
        filter === cat
          ? "bg-[#6d4aff] text-white shadow-md"
          : "bg-[#241a44] border border-[#3a2b66] text-[#cfc6ff] hover:bg-[#3b1d7a]"
      }`}
    >
      {cat}
    </button>
  ))}
</div>


        {loading && <p className="text-[#b8adff]">Loading bookmarks...</p>}
        {!loading && filteredBookmarks.length === 0 && (
          <p className="text-[#b8adff]">No bookmarks yet.</p>
        )}

        <div className="space-y-5">
          {filteredBookmarks.map(bookmark => (
            <BookmarkCard
              key={bookmark.id}
              bookmark={bookmark}
              onDelete={fetchBookmarks}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
