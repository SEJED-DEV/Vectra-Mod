/**
 * Vectra Mod (Template) - Ping Command
 *
 * Provides a heartbeat check to measure bot latency and API responsiveness.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 */

const { EmbedBuilder } = require('discord.js');
const VISUALS = require('../config/visuals');

module.exports = {
    name: 'ping',
    description: 'Checks the bot connectivity and latency.',
    execute: async (message) => {
        const BOT_NAME = process.env.BOT_NAME || 'Vectra Mod (Template)';

        const sent = await message.channel.send(`${VISUALS.emojis.loading} **Calculating latency...**`);
        const latency = sent.createdTimestamp - message.createdTimestamp;
        const apiLatency = Math.round(message.client.ws.ping);

        const embed = new EmbedBuilder()
            .setTitle(`${VISUALS.emojis.system} ${BOT_NAME} // Connectivity`)
            .setColor(0x5865F2)
            .addFields(
                { name: 'Bot Latency', value: `\`${latency}ms\``, inline: true },
                { name: 'API Latency', value: `\`${apiLatency}ms\``, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: `Vectra Infrastructure | sejed.dev` });

        await sent.edit({ content: null, embeds: [embed] });
    }
};
