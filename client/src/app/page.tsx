"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl font-bold mb-4 text-black">Welcome to Our Platform</h1>
        <p className="text-lg mb-8 text-black">Discover a new way to manage tasks and boost productivity.</p>

        {/* Call to Action Buttons */}
        <div className="flex space-x-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600" onClick={() => router.push("/register")}>
            Get Started
          </button>
          <button className="bg-slate-500 text-white px-4 py-2 rounded-full hover:bg-slate-600" onClick={() => router.push("/signin")}>
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
}
