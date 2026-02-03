"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });


    alert(
      error
        ? error.message
        : "Signup successful. Please login."
    );

    
    router.push("/login");
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#1b1430] via-[#211742] to-[#261a55]">
      <div className="w-80 bg-[#241a44] border border-[#3a2b66] rounded-2xl p-6 shadow-xl space-y-4">
        <h1 className="text-xl font-semibold text-[#f3efff] text-center">
          Sign Up
        </h1>

        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded-lg px-3 py-2 bg-[#1b1430] border border-[#3a2b66] text-[#f3efff] placeholder:text-[#a99cff] focus:outline-none"
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-lg px-3 py-2 bg-[#1b1430] border border-[#3a2b66] text-[#f3efff] placeholder:text-[#a99cff] focus:outline-none"
        />

        <button
          onClick={handleSignup}
          className="w-full rounded-lg py-2.5 bg-[#6d4aff] text-white font-medium hover:bg-[#7b5cff]"
        >
          Sign Up
        </button>

        <p className="text-sm text-center text-[#cfc6ff]">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-[#6d4aff] cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
