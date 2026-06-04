/**
 * Vectra Mod (Template) - Documentation Hub
 *
 * Provides comprehensive technical details on deployment, commands, and panel integration.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 */

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-white/5 p-6 flex justify-between items-center">
        <span className="font-bold tracking-widest">VECTRA // DOCS</span>
        <a href="/" className="text-sm text-zinc-400 hover:text-white transition-all">Back to Home</a>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-indigo-400">1. Deployment Steps</h2>
          <div className="glass p-6 space-y-4 text-zinc-300">
            <p>To initialize the infrastructure environment, follow these steps:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Configure <code>.env</code> with <code>DISCORD_TOKEN</code>, <code>MONGODB_URI</code>, and <code>BOT_NAME</code>.</li>
              <li>Execute <code>npm install</code> to synchronize dependencies.</li>
              <li>Run <code>node index.js</code> to trigger the visual banner and authentication loop.</li>
            </ol>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-indigo-400">2. Command Schemas</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left glass">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="p-4">Command</th>
                  <th className="p-4">Target</th>
                  <th className="p-4">Function</th>
                </tr>
              </thead>
              <tbody className="text-zinc-400">
                <tr className="border-b border-white/5">
                  <td className="p-4 font-mono text-white">!warn</td>
                  <td className="p-4">ID/Username</td>
                  <td className="p-4">Logs a formal warning to DB.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4 font-mono text-white">!mute</td>
                  <td className="p-4">ID/Username</td>
                  <td className="p-4">Executes a timed-out state.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4 font-mono text-white">!ban</td>
                  <td className="p-4">ID/Username</td>
                  <td className="p-4">Permanent expulsion from guild.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4 font-mono text-white">!setup-panel</td>
                  <td className="p-4">None</td>
                  <td className="p-4">Initializes global moderation hub.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-indigo-400">3. Staff Panel Integration</h2>
          <p className="text-zinc-400 mb-6">
            The infrastructure features two distinct interaction layers:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="glass p-6">
              <h4 className="font-bold text-white mb-2">Direct Panel</h4>
              <p className="text-sm text-zinc-400">Triggered via <code>!panel &lt;user&gt;</code> for immediate, target-specific actions.</p>
            </div>
            <div className="glass p-6">
              <h4 className="font-bold text-white mb-2">Global Hub</h4>
              <p className="text-sm text-zinc-400">A persistent message matrix that uses Modals to collect user input globally.</p>
            </div>
          </div>
          <div className="bg-indigo-500/10 border-l-4 border-indigo-500 p-6">
            <h4 className="font-bold text-white mb-2">Interaction Routing:</h4>
            <p className="text-sm text-zinc-300">
              Both layers route through the same <code>modActions</code> execution path, ensuring absolute parity in validation.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-indigo-400">4. Advanced Permissions</h2>
          <p className="text-zinc-400 mb-4">
            The system implements a granular security hierarchy defined in <code>config/permissions.js</code>.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-400">
            <li><strong>Moderate Members:</strong> Required for Warnings, Mutes, and Log Access.</li>
            <li><strong>Ban Members:</strong> Required for Bans and Unbans.</li>
            <li><strong>Administrator:</strong> Required for Hub Initialization (<code>!setup-panel</code>).</li>
            <li><strong>Hierarchy Validation:</strong> Automatic protection against actions on users with equal or higher roles.</li>
          </ul>
        </section>
      </main>

      <footer className="p-12 text-center text-zinc-600 border-t border-white/5">
        Technical Architecture Handover by sejed.dev | support@sejed.dev
      </footer>
    </div>
  );
}
