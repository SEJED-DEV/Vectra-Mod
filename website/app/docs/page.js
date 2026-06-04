/**
 * Vectra Mod (Template) - Documentation Hub
 *
 * Provides comprehensive technical details on deployment, commands, and panel integration.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 */

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      <nav className="border-b border-white/5 p-8 flex justify-between items-center glass sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center font-bold">V</div>
          <span className="font-bold tracking-widest text-lg">VECTRA // ARCHITECTURE</span>
        </div>
        <a href="/" className="text-sm text-zinc-400 hover:text-white transition-all bg-white/5 px-4 py-2 rounded-lg">Back to Home</a>
      </nav>

      <main className="max-w-5xl mx-auto px-8 py-24">
        {/* Intro */}
        <section className="mb-24">
          <h1 className="text-5xl font-black mb-6">Technical Specification</h1>
          <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
            Vectra Mod utilizes a custom-engineered JSON flat-file storage pipeline to provide lightning-fast,
            zero-latency moderation logging without the overhead of external database clusters.
          </p>
        </section>

        {/* 1. Deployment */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl font-black text-indigo-500/20">01</span>
            <h2 className="text-4xl font-bold">Deployment Lifecycle</h2>
          </div>
          <div className="glass p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-500 text-[10px] flex items-center justify-center">1</span>
                  Environment Configuration
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Populate the <code>.env</code> file in the root directory. This version of the template requires
                  <code>DISCORD_TOKEN</code> and <code>BOT_NAME</code>. The MongoDB requirement has been deprecated
                  in favor of local persistence.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-500 text-[10px] flex items-center justify-center">2</span>
                  Dependency Synchronization
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Execute <code>npm install</code>. The bot core is optimized for minimal dependencies, relying
                  primarily on <code>discord.js</code> and <code>dotenv</code>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Command Schemas */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl font-black text-indigo-500/20">02</span>
            <h2 className="text-4xl font-bold">Core Command Suite</h2>
          </div>
          <div className="overflow-hidden glass">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="p-6 text-indigo-400 text-sm font-mono">COMMAND</th>
                  <th className="p-6 text-indigo-400 text-sm font-mono">PARAMETERS</th>
                  <th className="p-6 text-indigo-400 text-sm font-mono">EXECUTION PATH</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 font-mono text-white italic">!warn</td>
                  <td className="p-6">ID/User + Reason</td>
                  <td className="p-6">Writes to <code>warns.json</code></td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 font-mono text-white italic">!mute</td>
                  <td className="p-6">ID/User + Reason</td>
                  <td className="p-6">Writes to <code>mutes.json</code></td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 font-mono text-white italic">!ban</td>
                  <td className="p-6">ID/User + Reason</td>
                  <td className="p-6">Writes to <code>bans.json</code></td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 font-mono text-white italic">!modlogs</td>
                  <td className="p-6">ID/User</td>
                  <td className="p-6">Aggregates user JSON logs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Storage Architecture */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl font-black text-indigo-500/20">03</span>
            <h2 className="text-4xl font-bold">Logging Infrastructure</h2>
          </div>
          <div className="glass p-10 border-l-4 border-indigo-500">
            <h4 className="text-2xl font-bold mb-6">Atomic JSON Storage</h4>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Instead of a monolithic database, Vectra Mod utilizes an atomic file-system approach.
              Each user has a dedicated directory within the <code>Logs/</code> folder, ensuring that
              read/write operations are isolated and extremely fast.
            </p>
            <div className="bg-black/40 p-6 rounded-lg font-mono text-sm text-indigo-300">
              <div className="mb-1">Logs/</div>
              <div className="ml-4 mb-1 text-zinc-500">└── user_123456789/</div>
              <div className="ml-8 mb-1">├── warns.json</div>
              <div className="ml-8 mb-1">├── mutes.json</div>
              <div className="ml-8">└── bans.json</div>
            </div>
          </div>
        </section>

        {/* 4. Permissions */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl font-black text-indigo-500/20">04</span>
            <h2 className="text-4xl font-bold">Advanced Permission Grid</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass p-8">
              <h5 className="font-bold mb-4 text-indigo-400">STAFF_LEVEL_01</h5>
              <p className="text-sm text-zinc-400 mb-2">Permissions: <code>ModerateMembers</code></p>
              <p className="text-xs text-zinc-500 italic">Actions: Warning, Muting, View Logs</p>
            </div>
            <div className="glass p-8">
              <h5 className="font-bold mb-4 text-red-400">STAFF_LEVEL_02</h5>
              <p className="text-sm text-zinc-400 mb-2">Permissions: <code>BanMembers</code></p>
              <p className="text-xs text-zinc-500 italic">Actions: Banning, Unbanning</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="p-20 text-center text-zinc-600 border-t border-white/5">
        Premium Technical Architecture Handover by <span className="text-white font-bold">sejed.dev</span>
        <div className="mt-4 text-xs">Support: support@sejed.dev</div>
      </footer>
    </div>
  );
}
