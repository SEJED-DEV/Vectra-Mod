/**
 * Vectra Mod - Unified Infraction Schema
 *
 * This model defines the structure for recording tracking info for all moderation actions.
 * It serves as a single source of truth for high-concurrency database architecture.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 *
 * Technical Architecture Choice:
 * - Using String for Discord Snowflake IDs (Target/Moderator) to prevent precision loss.
 * - Epoch Timestamps are handled natively via Mongoose 'timestamps' option.
 */

const mongoose = require('mongoose');

const InfractionSchema = new mongoose.Schema({
    // Unique Snowflake ID of the target user
    targetId: {
        type: String,
        required: true,
        index: true
    },
    // Unique Snowflake ID of the moderator who executed the action
    moderatorId: {
        type: String,
        required: true
    },
    // Type of infraction (e.g., 'warn', 'mute', 'ban', 'unban')
    type: {
        type: String,
        required: true,
        enum: ['warn', 'mute', 'ban', 'unban']
    },
    // Contextual reason for the moderation action
    reason: {
        type: String,
        default: 'No reason provided'
    },
    // Optional metadata for additional context (e.g., duration for mutes)
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, {
    // Automatically generate 'createdAt' and 'updatedAt' fields
    timestamps: true
});

// Export the model for use in the moderation pipeline
module.exports = mongoose.model('Infraction', InfractionSchema);
