/**
 * Vectra Mod (Template) - Visual Identity Configuration
 *
 * Defines the premium color palette and iconography used across
 * all V2 Embed responses for a consistent infrastructure aesthetic.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 */

module.exports = {
    colors: {
        success: 0x2ECC71, // Emerald Green
        error: 0xE74C3C,   // Alizarin Red
        info: 0x5865F2,    // Blurple (Discord Brand)
        system: 0x2B2D31,  // Dark Zinc/Dark Mode Background
        warning: 0xF1C40F   // Sunflower Yellow
    },
    emojis: {
        success: process.env.EMOJI_SUCCESS || '✅',
        error: process.env.EMOJI_ERROR || '❌',
        security: process.env.EMOJI_SECURITY || '🔒',
        system: process.env.EMOJI_SYSTEM || '⚙️',
        infraction: process.env.EMOJI_INFRA || '⚖️',
        loading: process.env.EMOJI_LOADING || '⏳'
    },
    footer: {
        text: 'Vectra Infrastructure | sejed.dev',
    }
};
