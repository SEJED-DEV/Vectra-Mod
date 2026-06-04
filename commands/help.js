/**
 * Vectra Mod (Template) - Help Command
 *
 * Dynamically lists all registered commands and their descriptions.
 * Automatically respects the configured command prefix.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 */

const { EmbedBuilder } = require('discord.js');
const VISUALS = require('../config/visuals');

module.exports = {
    name: 'help',
    description: 'Displays a comprehensive list of all available commands.',
    execute: async (message) => {
        const { client } = message;
        const BOT_NAME = process.env.BOT_NAME || 'Vectra Mod (Template)';
        const COMMAND_PREFIX = process.env.COMMAND_PREFIX || '!';

        const embed = new EmbedBuilder()
            .setTitle(`${VISUALS.emojis.system} ${BOT_NAME} // Terminal Interface`)
            .setDescription(`Accessing the moderation command matrix. All commands require the prefix: \`${COMMAND_PREFIX}\``)
            .setColor(0x2B2D31)
            .setThumbnail(client.user.displayAvatarURL());

        const commands = client.commands.map(cmd => {
            return `\`${COMMAND_PREFIX}${cmd.name.padEnd(10)}\` - ${cmd.description}`;
        }).join('\n');

        embed.addFields({ name: 'Available Commands', value: commands });
        embed.setFooter({ text: `Vectra Infrastructure Handover | sejed.dev` });
        embed.setTimestamp();

        await message.channel.send({ embeds: [embed] });
    }
};
