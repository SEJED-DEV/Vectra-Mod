/**
 * Vectra Mod (Template) - Unban Command
 *
 * Standalone text command to remove a ban from a user.
 * Requires the target's Snowflake ID if they are not in the cache.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 */

const { resolveUser } = require('../utils/userResolver');
const { executeModAction } = require('../utils/modActions');

module.exports = {
    name: 'unban',
    description: 'Removes a ban from a user.',
    execute: async (message, args) => {
        const client = message.client;
        const targetQuery = args[0];
        const reason = args.slice(1).join(' ') || 'No reason provided';

        const target = await resolveUser(client, targetQuery);
        if (!target) {
            return message.channel.send('[ERROR] Unable to resolve target user. Provide a valid Snowflake ID.');
        }

        await executeModAction(message, target, 'unban', reason);
    }
};
