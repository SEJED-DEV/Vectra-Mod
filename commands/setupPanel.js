/**
 * Vectra Mod (Template) - Persistent Moderation Hub Setup
 *
 * Generates a global moderation hub message.
 * Buttons on this panel trigger Modals to collect user input.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 */

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const permissionsConfig = require('../config/permissions');
const VISUALS = require('../config/visuals');

module.exports = {
    name: 'setup-panel',
    description: 'Initializes the persistent global moderation hub.',
    execute: async (message) => {
        const BOT_NAME = process.env.BOT_NAME || 'Vectra Mod (Template)';

        // Authorization Check for Setup
        if (!message.member.permissions.has(permissionsConfig.setupPanel)) {
            const securityEmbed = new EmbedBuilder()
                .setTitle(`${VISUALS.emojis.security} Unauthorized Access`)
                .setColor(VISUALS.colors.error)
                .setDescription(`Only administrators can initialize the ${BOT_NAME} global hub.`)
                .setFooter({ text: VISUALS.footer.text });
            return message.reply({ embeds: [securityEmbed] });
        }

        const embed = new EmbedBuilder()
            .setTitle(`${VISUALS.emojis.system} ${BOT_NAME} // Persistent Moderation Hub`)
            .setDescription('Global execution interface for staff members.\nClick an action below to open the input matrix.')
            .setColor(0x2B2D31)
            .setThumbnail(message.guild.iconURL())
            .addFields(
                { name: 'Security Protocol', value: 'All actions are logged to the JSON infrastructure and require individual granular permissions.', inline: false }
            )
            .setFooter({ text: `${BOT_NAME} Infrastructure | sejed.dev` });

        // Action Row 1: Primary Moderation
        const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('global_warn')
                    .setLabel('Issue Warning')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('global_mute')
                    .setLabel('Timeout Member')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('global_ban')
                    .setLabel('Ban User')
                    .setStyle(ButtonStyle.Danger)
            );

        // Action Row 2: Utilities
        const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('global_logs')
                    .setLabel('Lookup Logs')
                    .setStyle(ButtonStyle.Success)
            );

        return message.channel.send({
            embeds: [embed],
            components: [row1, row2]
        });
    }
};
