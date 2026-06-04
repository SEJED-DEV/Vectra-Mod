# Vectra Mod (Template) // Premium Moderation Infrastructure

Vectra Mod is a high-performance, premium Discord moderation infrastructure template designed for high-concurrency environments. It features a dual-layer interaction system (text commands + interactive UI) and a robust, flat-file JSON logging pipeline.

## 🚀 Key Features

- **Dual-Layer Execution**: Standalone text commands and interactive V2 UI staff panels.
- **JSON Flat-File Logging**: High-performance logging architecture organized by `Logs/user_<id>/[action]s.json`.
- **Advanced Permissions**: Granular permission validation for every moderation action.
- **Global Hub**: A persistent moderation hub message using Discord Modals for global staff operations.
- **Premium Branding**: Custom terminal assets and high-end Discord embed aesthetics.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Library**: Discord.js v14
- **Storage**: Local JSON Filesystem
- **Styling**: Tailwind CSS (Documentation Site)

## 📋 Installation

1. Clone the repository.
2. Run `npm install` in the root and `/website` directories.
3. Configure the `.env` file (see `.env.example`).
4. Execute `node index.js` to start the bot.

## 📂 Architecture

```text
├── commands/        # Moderation command modules
├── config/          # Permission and bot configurations
├── Logs/            # JSON infraction storage (Auto-generated)
├── utils/           # Shared logic (Logger, Actions, Resolver)
├── website/         # Next.js Documentation Application
└── index.js         # Core Execution Engine
```

## 🤝 Support

Authored by **sejed.dev**. For technical assistance, contact [support@sejed.dev](mailto:support@sejed.dev) or visit [https://sejed.dev](https://sejed.dev).

---
© 2026 Vectra Mod Infrastructure. Built with absolute discretion.
