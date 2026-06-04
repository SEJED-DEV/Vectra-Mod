require('dotenv').config();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const { connectDatabase } = require('./config/database');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Structural console branding banner designed with precise box-drawing elements
const displayConsoleBanner = () => {
    const banner = `
█████╗ ███████╗████████╗██╗  ██╗███████╗██╗         ██████╗ ██████╗ ██████╗ ███████╗
██╔══██╗██╔════╝╚══██╔══╝██║  ██║██╔════╝██║        ██╔════╝██╔═══██╗██╔══██╗██╔════╝
███████║█████╗     ██║   ███████║█████╗  ██║        ██║     ██║   ██║██████╔╝█████╗  
██╔══██║██╔══╝     ██║   ██╔══██║██╔══╝  ██║        ██║     ██║   ██║██╔══██╗██╔══╝  
██║  ██║███████╗   ██║   ██║  ██║███████╗███████╗   ╚██████╗╚██████╔╝██║  ██║███████╗
╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝    ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝
`;
    console.log('\x1b[35m%s\x1b[0m', banner);
    console.log('\x1b[36m%s\x1b[0m', '┌────────────────────────────────────────────────────────────────────────┐');
    console.log('\x1b[36m%s\x1b[0m', '│ [SUPPORT] 👉 support@sejed.dev                                         │');
    console.log('\x1b[36m%s\x1b[0m', '│ [PROJECTS] \x1b[4mhttps://sejed.dev\x1b[0m                                        │');
    console.log('\x1b[36m%s\x1b[0m', '└────────────────────────────────────────────────────────────────────────┘');
    console.log('');
};

client.once('ready', async () => {
    // Render terminal visual assets immediately upon execution loop startup
    displayConsoleBanner();
    
    console.log('\x1b[32m%s\x1b[0m', `[CORE] Secure connection initialized. Authenticated as: ${client.user.tag}`);
    
    // Connect to external persistent storage pipeline
    await connectDatabase();

    // Set interactive state presence configuration
    client.user.setPresence({
        activities: [{ name: 'Over Staff Panel V2', type: ActivityType.Watching }],
        status: 'online',
    });
    
    console.log('\x1b[34m%s\x1b[0m', `[STATUS] Presence configured successfully. Monitoring guild events.`);
});

process.on('unhandledRejection', (error) => {
    console.error('\x1b[31m%s\x1b[0m', '[FATAL ERROR] System captured an unhandled execution rejection:', error);
});

client.login(process.env.DISCORD_TOKEN);
