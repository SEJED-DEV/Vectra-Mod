/**
 * Vectra Mod (Template) - Modlogs Command
 *
 * Retrieves the moderation history for a specific user from MongoDB.
 * Displays infraction types, reasons, and timestamps.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 */

const { resolveUser } = require('../utils/userResolver');
const Infraction = require('../models/Infraction');
const { EmbedBuilder } = require('discord.js');
const permissionsConfig = require('../config/permissions');

module.exports = {
    name: 'modlogs',
    description: 'Retrieves moderation history for a user.',
    execute: async (message, args) => {
        const BOT_NAME = process.env.BOT_NAME || 'Vectra Mod (Template)';

        // Advanced Permission Check for Log Access
        if (!message.member.permissions.has(permissionsConfig.viewLogs)) {
            return message.reply('[UNAUTHORIZED] You lack the authority to view sensitive moderation logs.');
        }

        const client = message.client;
        const targetQuery = args[0];

        const target = await resolveUser(client, targetQuery);
        if (!target) {
            return message.channel.send('[ERROR] Unable to resolve target user.');
        }

        try {
            const logs = await Infraction.find({ targetId: target.id }).sort({ createdAt: -1 }).limit(10);

            if (logs.length === 0) {
                return message.channel.send(`[INFO] No moderation records found for **${target.tag}**.`);
            }

            const embed = new EmbedBuilder()
                .setTitle(`Moderation Logs: ${target.tag}`)
                .setColor(0x5865F2)
                .setThumbnail(target.displayAvatarURL())
                .setDescription(logs.map((log, index) => {
                    return `**${index + 1}. [${log.type.toUpperCase()}]** - ${log.reason}\n*Date: ${log.createdAt.toUTCString()}*`;
                }).join('\n\n'))
                .setFooter({ text: `${BOT_NAME} Pipeline | sejed.dev` });

            return message.channel.send({ embeds: [embed] });

        } catch (error) {
            console.error('\x1b[31m%s\x1b[0m', `[MODLOGS ERROR] Failed to fetch logs for ${target.id}:`, error.message);
            return message.channel.send('[FATAL] Failed to retrieve logs from database.');
        }
    }
};
