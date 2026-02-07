"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded check
    if (user === "hacker" && pass === "htn2026") {
      // We "sign in" by saving a flag in localStorage
      localStorage.setItem("mock_auth", "true");
      router.push("/?auth=success"); 
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
    <div className="relative flex min-h-screen items-center justify-center bg-[#fafaf9] p-4">
      <h1 className="absolute top-8 left-8 font-bold tracking-tight">
        <span className="text-4xl text-black md:text-5xl block sm:inline">Hackathon Global Inc.™</span>
        <span className="text-2xl md:text-3xl text-zinc-600 ml-0 sm:ml-2">Events</span>
      </h1>
      <div className="w-full max-w-sm space-y-6 border border-black p-8 bg-white rounded-xl">
        <h1 className="text-2xl bg-white font-bold text-black text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4 text-black">
          <Input placeholder="Username" className="border-black" onChange={(e) => setUser(e.target.value)} />
          <Input type="password" className="border-black" placeholder="Password" onChange={(e) => setPass(e.target.value)} />
          <Button type="submit" className="w-full border-black border text-black bg-white hover:text-white hover:bg-black">Sign In</Button>
        </form>
      </div>
    </div>
    </>
  );
}
