/**
 * Vectra Mod (Template) - Granular Permissions Configuration
 *
 * Defines the specific Discord permission requirements for every moderation action.
 * Centralizing this allows for easy adjustments to the security hierarchy.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 */

const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    // Basic warnings require moderate members permission
    warn: [PermissionFlagsBits.ModerateMembers],

    // Muting/Timeouts require moderate members permission
    mute: [PermissionFlagsBits.ModerateMembers],

    // Banning requires high-level ban permission
    ban: [PermissionFlagsBits.BanMembers],

    // Unbanning requires high-level ban permission
    unban: [PermissionFlagsBits.BanMembers],

    // Viewing logs requires moderate members permission
    viewLogs: [PermissionFlagsBits.ModerateMembers],

    // Setting up the global panel requires administrative overhead
    setupPanel: [PermissionFlagsBits.Administrator]
};
