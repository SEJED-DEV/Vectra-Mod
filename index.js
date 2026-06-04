/**
 * Vectra Mod - Core Execution Engine (Template)
 *
 * Main entry point for the Discord bot. Handles command parsing,
 * interaction routing, and database initialization.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 */

require('dotenv').config();
const {
    Client,
    GatewayIntentBits,
    ActivityType,
    Collection,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    EmbedBuilder
} = require('discord.js');
const { connectDatabase } = require('./config/database');
const fs = require('fs');
const path = require('path');
const { executeModAction } = require('./utils/modActions');
const Infraction = require('./models/Infraction');
const { resolveUser } = require('./utils/userResolver');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Dynamic Configuration: Externalize Bot Name
const BOT_NAME = process.env.BOT_NAME || 'Vectra Mod (Template)';

// Initialize Command Collection
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.name, command);
}

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
    console.log('\x1b[36m%s\x1b[0m', `│ [SYSTEM] Bot Identity: ${BOT_NAME.padEnd(48)} │`);
    console.log('\x1b[36m%s\x1b[0m', '│ [SUPPORT] 👉 support@sejed.dev                                         │');
    console.log('\x1b[36m%s\x1b[0m', '│ [PROJECTS] \x1b[4mhttps://sejed.dev\x1b[0m                                        │');
    console.log('\x1b[36m%s\x1b[0m', '└────────────────────────────────────────────────────────────────────────┘');
    console.log('');
};

client.once('ready', async () => {
    displayConsoleBanner();
    console.log('\x1b[32m%s\x1b[0m', `[CORE] Secure connection initialized. Authenticated as: ${client.user.tag}`);
    
    await connectDatabase();

    client.user.setPresence({
        activities: [{ name: `Over ${BOT_NAME} Staff Panel`, type: ActivityType.Watching }],
        status: 'online',
    });
    
    console.log('\x1b[34m%s\x1b[0m', `[STATUS] Presence configured successfully. Monitoring guild events.`);
});

// Standalone Text Command Handler
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith('!')) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', `[COMMAND ERROR] Failed to execute ${commandName}:`, error);
        message.reply('[ERROR] An internal error occurred while processing this command.');
    }
});

// Interactive Panel Interaction Handler
client.on('interactionCreate', async (interaction) => {
    // 1. Handle Button Clicks
    if (interaction.isButton()) {
        const [prefix, action, targetId] = interaction.customId.split('_');

        // Handle Global Panel Buttons (triggering modals)
        if (prefix === 'global') {
            const modal = new ModalBuilder()
                .setCustomId(`modal_${action}`)
                .setTitle(`${BOT_NAME}: ${action.toUpperCase()}`);

            const targetInput = new TextInputBuilder()
                .setCustomId('target_id')
                .setLabel('Target User (ID or Username)')
                .setStyle(TextInputStyle.Short)
                .setRequired(true);

            const reasonInput = new TextInputBuilder()
                .setCustomId('reason')
                .setLabel('Contextual Reason')
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(false)
                .setPlaceholder('No reason provided');

            modal.addComponents(
                new ActionRowBuilder().addComponents(targetInput),
                new ActionRowBuilder().addComponents(reasonInput)
            );

            return await interaction.showModal(modal);
        }

        // Handle Per-User Panel Buttons (direct execution)
        if (prefix === 'mod') {
            const target = await client.users.fetch(targetId).catch(() => null);
            if (!target) return interaction.reply({ content: '[ERROR] Target no longer exists.', ephemeral: true });

            if (action === 'logs') {
                try {
                    const logs = await Infraction.find({ targetId: target.id }).sort({ createdAt: -1 }).limit(10);
                    const embed = new EmbedBuilder()
                        .setTitle(`Moderation Logs: ${target.tag}`)
                        .setColor(0x5865F2)
                        .setDescription(logs.length ? logs.map(l => `**[${l.type.toUpperCase()}]** - ${l.reason}`).join('\n') : 'No records found.')
                        .setFooter({ text: `${BOT_NAME} | sejed.dev` });
                    return interaction.reply({ embeds: [embed], ephemeral: true });
                } catch (e) {
                    return interaction.reply({ content: '[ERROR] Database query failed.', ephemeral: true });
                }
            }

            const actionMap = { 'warn': 'warn', 'mute': 'mute', 'ban': 'ban' };
            if (actionMap[action]) {
                await executeModAction(interaction, target, actionMap[action], `Executed via ${BOT_NAME} Staff Control Panel`, action === 'mute' ? { duration: 3600000 } : {});
            }
        }
    }

    // 2. Handle Modal Submissions
    if (interaction.isModalSubmit()) {
        const [prefix, action] = interaction.customId.split('_');
        if (prefix !== 'modal') return;

        const targetQuery = interaction.fields.getTextInputValue('target_id');
        const reason = interaction.fields.getTextInputValue('reason') || 'No reason provided';

        const target = await resolveUser(client, targetQuery);
        if (!target) {
            return interaction.reply({ content: `[ERROR] Unable to resolve target for: ${targetQuery}`, ephemeral: true });
        }

        if (action === 'logs') {
            try {
                const logs = await Infraction.find({ targetId: target.id }).sort({ createdAt: -1 }).limit(10);
                const embed = new EmbedBuilder()
                    .setTitle(`Moderation Logs: ${target.tag}`)
                    .setColor(0x5865F2)
                    .setDescription(logs.length ? logs.map(l => `**[${l.type.toUpperCase()}]** - ${l.reason}`).join('\n') : 'No records found.')
                    .setFooter({ text: `${BOT_NAME} | sejed.dev` });
                return interaction.reply({ embeds: [embed], ephemeral: true });
            } catch (e) {
                return interaction.reply({ content: '[ERROR] Database query failed.', ephemeral: true });
            }
        }

        const actionMap = { 'warn': 'warn', 'mute': 'mute', 'ban': 'ban' };
        if (actionMap[action]) {
            await executeModAction(interaction, target, actionMap[action], reason, action === 'mute' ? { duration: 3600000 } : {});
        }
    }
});

process.on('unhandledRejection', (error) => {
    console.error('\x1b[31m%s\x1b[0m', '[FATAL ERROR] System captured an unhandled execution rejection:', error);
});

client.login(process.env.DISCORD_TOKEN);
