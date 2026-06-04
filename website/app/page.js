/**
 * Vectra Mod (Template) Documentation - Main Landing Page
 *
 * Designed with a premium, high-end dark-themed infrastructure aesthetic.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 */

import Link from 'next/link';

/**
 * Technical Architecture Note:
 * This landing page utilizes a "Radial Diffusion" background strategy to create
 * a premium infrastructure aesthetic without heavy assets.
 *
 * Performance: Next.js Server Components ensure zero-bundle impact for this static view.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-indigo-500 selection:text-white font-sans overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      {/*
          Hero Section:
          Utilizes negative letter-spacing and ultra-bold weights (900)
          to match high-end developer tool aesthetics (e.g., Vercel, Linear).
      */}
      <main className="relative max-w-6xl mx-auto px-6 py-32 flex flex-col items-center text-center">
        <div className="glass px-4 py-1 rounded-full text-xs font-mono tracking-widest text-indigo-400 mb-8 animate-pulse">
          VECTRA INFRASTRUCTURE V2.0
        </div>

        <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 gradient-text leading-tight">
          VECTRA MOD
        </h1>

        <p className="text-xl md:text-3xl text-zinc-400 max-w-3xl mb-16 leading-relaxed">
          Premium moderation infrastructure template for high-concurrency environments.
          Engineered with <span className="text-white font-bold">JSON Flat-File Persistence</span> and <span className="text-white font-bold">Discord V2 UI</span>.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/docs" className="bg-white text-black px-10 py-5 rounded-xl font-bold hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            Explore Documentation
          </Link>
          <a href="mailto:support@sejed.dev" className="glass px-10 py-5 rounded-xl font-bold hover:bg-white/5 transition-all border border-white/10">
            Technical Support
          </a>
        </div>

        {/*
            Modular Feature Grid:
            Implements glassmorphism with Backdrop Filters and subtle
            border-top gradients for a "floating layer" effect.
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40 text-left w-full">
          <div className="glass p-10 border-t border-white/10 hover:border-indigo-500/50 transition-colors group">
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">File-System Logs</h3>
            <p className="text-zinc-400 leading-relaxed">High-performance JSON logging architecture organized by unique user directories for absolute data isolation.</p>
          </div>

          <div className="glass p-10 border-t border-white/10 hover:border-blue-500/50 transition-colors group">
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" /></svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Interactive V2 UI</h3>
            <p className="text-zinc-400 leading-relaxed">Leverage Discord Modals and Action Rows to provide a premium, application-like experience for staff members.</p>
          </div>

          <div className="glass p-10 border-t border-white/10 hover:border-purple-500/50 transition-colors group">
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Dynamic Identity</h3>
            <p className="text-zinc-400 leading-relaxed">Full environment-driven configuration allowing you to customize bot naming and presence while preserving sejed.dev standards.</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 py-20 text-center">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-zinc-500 gap-8">
          <div className="text-left">
            <span className="text-white font-bold tracking-widest text-lg">VECTRA</span>
            <p className="mt-2 text-sm max-w-xs text-zinc-600">The definitive standard for Discord moderation infrastructure templates.</p>
          </div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Vectra Mod Infrastructure. Built by <a href="https://sejed.dev" className="text-white hover:underline">sejed.dev</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
