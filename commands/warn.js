/**
 * Vectra Mod (Template) - Warn Command
 *
 * Standalone text command to issue a formal warning to a user.
 * Records the infraction in the unified database pipeline.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 */

const { resolveUser } = require('../utils/userResolver');
const { executeModAction } = require('../utils/modActions');
const { EmbedBuilder } = require('discord.js');
const VISUALS = require('../config/visuals');

module.exports = {
    name: 'warn',
    description: 'Issues a formal warning to a user.',
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

        // Shared execution logic handles granular permission validation
        await executeModAction(message, target, 'warn', reason);
    }
};
