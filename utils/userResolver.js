/**
 * Vectra Mod - User Resolution Utility
 *
 * This utility resolves Discord users from either a Snowflake ID or a Username query string.
 * It is used across both text commands and interaction handlers.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 *
 * Parameters:
 * @param {Client} client - The Discord.js client instance.
 * @param {string} query - The ID or username string to resolve.
 */

const resolveUser = async (client, query) => {
    if (!query) return null;

    // Remove mention markers if present
    const cleanQuery = query.replace(/[<@!>]/g, '');

    try {
        // 1. Attempt resolution by Snowflake ID
        if (/^\d{17,19}$/.test(cleanQuery)) {
            return await client.users.fetch(cleanQuery).catch(() => null);
        }

        // 2. Attempt resolution by exact username or tag (handling new username system and legacy tags)
        // We search in all guilds the bot is in to find the user
        let user = null;
        for (const guild of client.guilds.cache.values()) {
            const member = guild.members.cache.find(m =>
                m.user.username.toLowerCase() === query.toLowerCase() ||
                m.user.tag.toLowerCase() === query.toLowerCase()
            );
            if (member) {
                user = member.user;
                break;
            }
        }

        if (user) return user;

        // 3. Fallback: Search globally if not found in cache
        return null;
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', `[RESOLVER ERROR] Failed to resolve user for query "${query}":`, error.message);
        return null;
    }
};

module.exports = { resolveUser };
