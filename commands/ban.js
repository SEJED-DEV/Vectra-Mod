/**
 * Vectra Mod (Template) - Ban Command
 *
 * Standalone text command to ban a user from the guild.
 * Records the action in the persistent JSON logging pipeline.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 */

const { resolveUser } = require('../utils/userResolver');
const { executeModAction } = require('../utils/modActions');

module.exports = {
    name: 'ban',
    description: 'Bans a user from the guild.',
    execute: async (message, args) => {
        const client = message.client;
        const targetQuery = args[0];
        const reason = args.slice(1).join(' ') || 'No reason provided';

        const target = await resolveUser(client, targetQuery);
        if (!target) {
            return message.channel.send('[ERROR] Unable to resolve target user. Provide a valid ID or Username.');
        }

        await executeModAction(message, target, 'ban', reason);
    }
};
