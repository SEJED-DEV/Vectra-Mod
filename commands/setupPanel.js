/**
 * Vectra Mod - Persistent Moderation Hub Setup
 *
 * Generates a global moderation panel that can sit in a specific channel.
 * Buttons on this panel trigger Modals to collect user input.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 */

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const permissionsConfig = require('../config/permissions');

module.exports = {
    name: 'setup-panel',
    description: 'Initializes the persistent global moderation hub.',
    execute: async (message) => {
        // Authorization Check for Setup
        if (!message.member.permissions.has(permissionsConfig.setupPanel)) {
            return message.reply('[UNAUTHORIZED] Only administrators can initialize the global hub.');
        }

        const embed = new EmbedBuilder()
            .setTitle('Vectra Mod // Persistent Moderation Hub')
            .setDescription('Global execution interface for staff members.\nClick an action below to open the input matrix.')
            .setColor(0x2B2D31)
            .setThumbnail(message.guild.iconURL())
            .addFields(
                { name: 'Security Protocol', value: 'All actions are logged to the MongoDB pipeline and require individual granular permissions.', inline: false }
            )
            .setFooter({ text: 'Vectra Mod Infrastructure | sejed.dev' });

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
