/**
 * Vectra Mod (Template) - Kick Command
 *
 * Standalone text command to kick a user from the guild.
 * Utilizes the centralized modActions execution path.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 */

const { resolveUser } = require('../utils/userResolver');
const { executeModAction } = require('../utils/modActions');
const { EmbedBuilder } = require('discord.js');
const VISUALS = require('../config/visuals');

module.exports = {
    name: 'kick',
    description: 'Kicks a user from the guild.',
    execute: async (message, args) => {
        const client = message.client;
        const targetQuery = args[0];
        const reason = args.slice(1).join(' ') || 'No reason provided';

        if (!targetQuery) {
            const usageEmbed = new EmbedBuilder()
                .setTitle(`${VISUALS.emojis.system} Command Usage`)
                .setColor(VISUALS.colors.warning)
                .setDescription('`!kick <user/id> [reason]`')
                .setFooter({ text: VISUALS.footer.text });
            return message.channel.send({ embeds: [usageEmbed] });
        }

        const target = await resolveUser(client, targetQuery);
        if (!target) {
            const errorEmbed = new EmbedBuilder()
                .setTitle(`${VISUALS.emojis.error} Resolution Error`)
                .setColor(VISUALS.colors.error)
                .setDescription('Unable to resolve target user.')
                .setFooter({ text: VISUALS.footer.text });
            return message.channel.send({ embeds: [errorEmbed] });
        }

        await executeModAction(message, target, 'kick', reason);
    }
};
