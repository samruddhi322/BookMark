"use client";

export default function Navbar({ onLogout }) {
  return (
    <div className="w-full bg-white border-b border-zinc-200 px-8 py-4 flex justify-between items-center">
      <h1 className="text-base font-semibold text-slate-800">
        My Bookmarks
      </h1>

      <button
        onClick={onLogout}
        className="text-sm text-slate-600 hover:text-slate-900 transition"
      >
        Logout
      </button>
    </div>
  );
}
