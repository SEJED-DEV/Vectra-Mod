/**
 * Vectra Mod (Template) - Shared Moderation Execution Logic
 *
 * This module centralizes the execution paths for all moderation actions.
 * It ensures that both standalone commands and panel button interactions
 * share the exact same validation, authorization checks, and execution paths.
 *
 * Now migrated to high-performance JSON flat-file storage.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 */

const { logInfraction } = require('./jsonLogger');
const permissionsConfig = require('../config/permissions');

/**
 * Executes a moderation action and logs it to the JSON filesystem.
 *
 * @param {Object} context - Execution context (message or interaction)
 * @param {Object} target - The target User object
 * @param {String} type - Infraction type (warn, mute, ban, unban)
 * @param {String} reason - Contextual reason
 * @param {Object} options - Additional metadata (e.g., duration)
 */
const executeModAction = async (context, target, type, reason, options = {}) => {
    const moderator = context.user || context.author;
    const guild = context.guild;

    // 1. Advanced Granular Authorization Check
    const requiredPerms = permissionsConfig[type];
    if (requiredPerms && !context.member.permissions.has(requiredPerms)) {
        const msg = `[UNAUTHORIZED] You lack the specific authority required for: ${type.toUpperCase()}.`;
        return context.reply ? context.reply({ content: msg, ephemeral: true }) : context.channel.send(msg);
    }

    try {
        // 2. Target Hierarchy Check (if target is in guild)
        const targetMember = await guild.members.fetch(target.id).catch(() => null);
        if (targetMember && !targetMember.manageable && type !== 'unban') {
            const msg = `[HIERARCHY ERROR] Unable to ${type} ${target.tag}. Target has higher or equal role authority.`;
            return context.reply ? context.reply({ content: msg, ephemeral: true }) : context.channel.send(msg);
        }

        // 3. Execute Discord API Action
        let actionResult = true;
        switch (type) {
            case 'ban':
                await guild.members.ban(target.id, { reason });
                break;
            case 'unban':
                await guild.members.unban(target.id, reason);
                break;
            case 'mute':
                if (targetMember) {
                    const duration = options.duration || 3600000; // Default 1 hour
                    await targetMember.timeout(duration, reason);
                } else {
                    actionResult = false;
                }
                break;
            case 'warn':
                await target.send(`You have been warned in ${guild.name} for: ${reason}`).catch(() => null);
                break;
        }

        if (!actionResult) {
            const msg = `[EXECUTION ERROR] Target user is not in the guild; cannot perform ${type}.`;
            return context.reply ? context.reply({ content: msg, ephemeral: true }) : context.channel.send(msg);
        }

        // 4. Log to JSON Pipeline
        logInfraction(target.id, type, {
            targetTag: target.tag,
            moderatorId: moderator.id,
            moderatorTag: moderator.tag,
            reason,
            metadata: options
        });

        // 5. Visual Confirmation
        const BOT_NAME = process.env.BOT_NAME || 'Vectra Mod (Template)';
        const successMsg = `[SUCCESS] **${type.toUpperCase()}** executed on ${target.tag} (ID: ${target.id}). Reason: ${reason}`;
        console.log('\x1b[34m%s\x1b[0m', `[MODLOG] ${type.toUpperCase()} | Target: ${target.tag} | Mod: ${moderator.tag}`);

        return context.reply ? context.reply({ content: successMsg, ephemeral: true }) : context.channel.send(successMsg);

    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', `[MOD ACTION ERROR] Execution failed for ${type} on ${target.id}:`, error.message);
        const errorMsg = `[FATAL] Action failed: ${error.message}`;
        return context.reply ? context.reply({ content: errorMsg, ephemeral: true }) : context.channel.send(errorMsg);
    }
};

module.exports = { executeModAction };
