/**
 * Vectra Mod (Template) - Mute Command
 *
 * Standalone text command to timeout a user in the guild.
 * Defaults to 1 hour if no duration is specified.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 */

const { resolveUser } = require('../utils/userResolver');
const { executeModAction } = require('../utils/modActions');
const { EmbedBuilder } = require('discord.js');
const VISUALS = require('../config/visuals');

module.exports = {
    name: 'mute',
    description: 'Times out a user in the guild.',
    execute: async (message, args) => {
        const client = message.client;
        const targetQuery = args[0];
        const reason = args.slice(1).join(' ') || 'No reason provided';

        const target = await resolveUser(client, targetQuery);
        if (!target) {
            const errorEmbed = new EmbedBuilder()
                .setTitle(`${VISUALS.emojis.error} Resolution Error`)
                .setColor(VISUALS.colors.error)
                .setDescription('Unable to resolve target user. Provide a valid ID or Username.')
                .setFooter({ text: VISUALS.footer.text });
            return message.channel.send({ embeds: [errorEmbed] });
        }

        // Execution with default 1 hour duration (3600000 ms)
        await executeModAction(message, target, 'mute', reason, { duration: 3600000 });
    }
};
