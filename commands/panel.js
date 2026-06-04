/**
 * Vectra Mod - Staff Control Panel
 *
 * Generates an interactive message matrix for a target user using V2 UI components.
 * Directly pings the target user inline as per operational blueprint.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 */

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { resolveUser } = require('../utils/userResolver');

module.exports = {
    name: 'panel',
    description: 'Generates an interactive moderation panel for a user.',
    execute: async (message, args) => {
        const client = message.client;
        const targetQuery = args[0];

        const target = await resolveUser(client, targetQuery);
        if (!target) {
            return message.channel.send('[ERROR] Unable to resolve target user for panel initialization.');
        }

        const embed = new EmbedBuilder()
            .setTitle('Staff Control Panel V2')
            .setDescription(`Interactive moderation matrix for ${target} (ID: \`${target.id}\`).\nSelect an action below to execute with standard validation.`)
            .setColor(0x2B2D31)
            .setThumbnail(target.displayAvatarURL())
            .setFooter({ text: 'Vectra Mod Execution Layer | sejed.dev' });

        // Generate Action Row containing interactive buttons
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`mod_warn_${target.id}`)
                    .setLabel('Warn')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId(`mod_mute_${target.id}`)
                    .setLabel('Mute (1h)')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId(`mod_ban_${target.id}`)
                    .setLabel('Ban')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId(`mod_logs_${target.id}`)
                    .setLabel('View Logs')
                    .setStyle(ButtonStyle.Success)
            );

        return message.channel.send({
            content: `[PANEL] Targeting: ${target}`,
            embeds: [embed],
            components: [row]
        });
    }
};
