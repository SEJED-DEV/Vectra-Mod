/**
 * Vectra Mod Documentation - Main Landing Page
 *
 * Designed with a premium, high-end dark-themed infrastructure aesthetic.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 */

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-indigo-500 selection:text-white">
      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 gradient-text">
          VECTRA MOD
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mb-12">
          Next-generation moderation infrastructure for high-concurrency environments.
          Powered by MongoDB and Discord V2 Components.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/docs" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-zinc-200 transition-all">
            Explore Documentation
          </Link>
          <a href="mailto:support@sejed.dev" className="glass px-8 py-4 rounded-full font-bold hover:bg-white/5 transition-all">
            Technical Support
          </a>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 text-left">
          <div className="glass p-8">
            <h3 className="text-xl font-bold mb-4">Unified Pipeline</h3>
            <p className="text-zinc-400">All actions are routed through a single Mongoose execution layer for absolute consistency.</p>
          </div>
          <div className="glass p-8">
            <h3 className="text-xl font-bold mb-4">Interactive V2 UI</h3>
            <p className="text-zinc-400">High-performance staff control panels using Discord Action Rows and Button components.</p>
          </div>
          <div className="glass p-8">
            <h3 className="text-xl font-bold mb-4">Premium Branding</h3>
            <p className="text-zinc-400">Tailored terminal aesthetics and documentation authored by sejed.dev experts.</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 py-12 text-center text-zinc-500 text-sm">
        &copy; {new Date().getFullYear()} Vectra Mod Infrastructure. Built by <a href="https://sejed.dev" className="text-white hover:underline">sejed.dev</a>
      </footer>
    </div>
  );
}
