/**
 * Vectra Mod (Template) - Staff Control Panel
 *
 * Generates an interactive message matrix for a target user using V2 UI components.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 */

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { resolveUser } = require('../utils/userResolver');
const VISUALS = require('../config/visuals');

module.exports = {
    name: 'panel',
    description: 'Generates an interactive moderation panel for a user.',
    execute: async (message, args) => {
        const BOT_NAME = process.env.BOT_NAME || 'Vectra Mod (Template)';
        const client = message.client;
        const targetQuery = args[0];

        const target = await resolveUser(client, targetQuery);
        if (!target) {
            const errorEmbed = new EmbedBuilder()
                .setTitle(`${VISUALS.emojis.error} Initialization Error`)
                .setColor(VISUALS.colors.error)
                .setDescription('Unable to resolve target user for panel initialization.')
                .setFooter({ text: VISUALS.footer.text });
            return message.channel.send({ embeds: [errorEmbed] });
        }

        const embed = new EmbedBuilder()
            .setTitle(`${VISUALS.emojis.system} ${BOT_NAME} Staff Panel`)
            .setDescription(`Interactive moderation matrix for ${target} (ID: \`${target.id}\`).\nSelect an action below to execute with standard validation.`)
            .setColor(0x2B2D31)
            .setThumbnail(target.displayAvatarURL())
            .setFooter({ text: `${BOT_NAME} Execution Layer | sejed.dev` });

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
            content: `${VISUALS.emojis.system} **Terminal Targeting:** ${target}`,
            embeds: [embed],
            components: [row]
        });
    }
};
