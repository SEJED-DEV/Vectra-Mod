/**
 * Vectra Mod (Template) - JSON Logging Utility
 *
 * Handles persistent storage of moderation infractions using a flat-file JSON architecture.
 * Structure: Logs/user_<id>/[warns|mutes|bans|unbans].json
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 */

const fs = require('fs');
const path = require('path');

const LOGS_DIR = path.join(__dirname, '..', 'Logs');

/**
 * Ensures that the directory for a specific user exists.
 * @param {string} userId - Discord Snowflake ID
 */
const ensureUserDirectory = (userId) => {
    const userPath = path.join(LOGS_DIR, `user_${userId}`);
    if (!fs.existsSync(userPath)) {
        fs.mkdirSync(userPath, { recursive: true });
    }
    return userPath;
};

/**
 * Appends an infraction record to the appropriate JSON file.
 * @param {string} userId - Target user ID
 * @param {string} type - Infraction type
 * @param {object} data - Infraction details
 */
const logInfraction = (userId, type, data) => {
    const userPath = ensureUserDirectory(userId);
    const fileName = `${type}s.json`; // e.g., warns.json, mutes.json
    const filePath = path.join(userPath, fileName);

    let logs = [];
    if (fs.existsSync(filePath)) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            logs = JSON.parse(content);
        } catch (error) {
            console.error(`[LOGGER ERROR] Failed to parse logs for ${userId}:`, error.message);
        }
    }

    const record = {
        ...data,
        timestamp: new Date().toISOString(),
        epoch: Date.now()
    };

    logs.push(record);
    fs.writeFileSync(filePath, JSON.stringify(logs, null, 4));

    return record;
};

/**
 * Retrieves all logs for a specific user across all action types.
 * @param {string} userId - Target user ID
 */
const getUserLogs = (userId) => {
    const userPath = path.join(LOGS_DIR, `user_${userId}`);
    if (!fs.existsSync(userPath)) return [];

    const files = fs.readdirSync(userPath);
    let allLogs = [];

    files.forEach(file => {
        if (file.endsWith('.json')) {
            try {
                const content = fs.readFileSync(path.join(userPath, file), 'utf8');
                const logs = JSON.parse(content);
                const type = file.replace('s.json', '');

                allLogs = allLogs.concat(logs.map(log => ({ ...log, type })));
            } catch (error) {
                console.error(`[LOGGER ERROR] Failed to read ${file} for ${userId}:`, error.message);
            }
        }
    });

    // Sort by timestamp descending
    return allLogs.sort((a, b) => b.epoch - a.epoch);
};

module.exports = { logInfraction, getUserLogs };
