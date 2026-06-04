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
const { EmbedBuilder } = require('discord.js');
const VISUALS = require('../config/visuals');

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
        const embed = new EmbedBuilder()
            .setTitle(`${VISUALS.emojis.security} Unauthorized Access`)
            .setColor(VISUALS.colors.error)
            .setDescription(`You lack the specific authority required for: \`${type.toUpperCase()}\`.`)
            .setFooter({ text: VISUALS.footer.text });

        return context.reply ? context.reply({ embeds: [embed], ephemeral: true }) : context.channel.send({ embeds: [embed] });
    }

    try {
        // 2. Target Hierarchy Check (if target is in guild)
        const targetMember = await guild.members.fetch(target.id).catch(() => null);
        if (targetMember && !targetMember.manageable && type !== 'unban') {
            const embed = new EmbedBuilder()
                .setTitle(`${VISUALS.emojis.error} Hierarchy Conflict`)
                .setColor(VISUALS.colors.error)
                .setDescription(`Unable to perform \`${type}\` on **${target.tag}**. Target possesses higher or equal role authority.`)
                .setFooter({ text: VISUALS.footer.text });

            return context.reply ? context.reply({ embeds: [embed], ephemeral: true }) : context.channel.send({ embeds: [embed] });
        }

        // 3. Execute Discord API Action
        let actionResult = true;
        switch (type) {
            case 'ban':
                await guild.members.ban(target.id, { reason });
                break;
            case 'kick':
                if (targetMember) {
                    await targetMember.kick(reason);
                } else {
                    actionResult = false;
                }
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
            const embed = new EmbedBuilder()
                .setTitle(`${VISUALS.emojis.error} Execution Halted`)
                .setColor(VISUALS.colors.error)
                .setDescription(`Target user is not currently in the guild; unable to perform \`${type}\`.`)
                .setFooter({ text: VISUALS.footer.text });

            return context.reply ? context.reply({ embeds: [embed], ephemeral: true }) : context.channel.send({ embeds: [embed] });
        }

        // 4. Log to JSON Pipeline
        logInfraction(target.id, type, {
            targetTag: target.tag,
            moderatorId: moderator.id,
            moderatorTag: moderator.tag,
            reason,
            metadata: options
        });

        // 5. External Action Logging (Channels)
        const kickBanChannelId = process.env.LOG_CHANNEL_KICK_BAN;
        const modChannelId = process.env.LOG_CHANNEL_MOD;

        const logEmbed = new EmbedBuilder()
            .setTitle(`${VISUALS.emojis.infraction} System Action: ${type.toUpperCase()}`)
            .setColor(type === 'ban' || type === 'kick' ? VISUALS.colors.error : VISUALS.colors.warning)
            .addFields(
                { name: 'Target', value: `${target.tag} (\`${target.id}\`)`, inline: true },
                { name: 'Moderator', value: `${moderator.tag} (\`${moderator.id}\`)`, inline: true },
                { name: 'Reason', value: reason, inline: false }
            )
            .setTimestamp()
            .setFooter({ text: `Vectra Infrastructure | sejed.dev` });

        if (['ban', 'kick'].includes(type) && kickBanChannelId) {
            const channel = await guild.channels.fetch(kickBanChannelId).catch(() => null);
            if (channel) {
                await channel.send({ content: '@here @everyone', embeds: [logEmbed] });
            }
        } else if (modChannelId) {
            const channel = await guild.channels.fetch(modChannelId).catch(() => null);
            if (channel) {
                await channel.send({ embeds: [logEmbed] });
            }
        }

        // 6. Visual Confirmation
        const successEmbed = new EmbedBuilder()
            .setTitle(`${VISUALS.emojis.success} Action Finalized`)
            .setColor(VISUALS.colors.success)
            .setDescription(`Successfully executed **${type.toUpperCase()}** on **${target.tag}**.`)
            .addFields({ name: 'Contextual Reason', value: reason })
            .setFooter({ text: VISUALS.footer.text })
            .setTimestamp();

        console.log('\x1b[34m%s\x1b[0m', `[MODLOG] ${type.toUpperCase()} | Target: ${target.tag} | Mod: ${moderator.tag}`);

        return context.reply ? context.reply({ embeds: [successEmbed], ephemeral: true }) : context.channel.send({ embeds: [successEmbed] });

    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', `[MOD ACTION ERROR] Execution failed for ${type} on ${target.id}:`, error.message);
        const errorEmbed = new EmbedBuilder()
            .setTitle(`${VISUALS.emojis.error} System Failure`)
            .setColor(VISUALS.colors.error)
            .setDescription(`An internal error occurred while executing \`${type}\`: \`${error.message}\``)
            .setFooter({ text: VISUALS.footer.text });

        return context.reply ? context.reply({ embeds: [errorEmbed], ephemeral: true }) : context.channel.send({ embeds: [errorEmbed] });
    }
};

module.exports = { executeModAction };
