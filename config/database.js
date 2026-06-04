/**
 * Vectra Mod (Template) - Database Configuration Layer
 *
 * This module initializes the persistent connection to MongoDB using Mongoose.
 * It is designed for high-concurrency environments and implements established console branding.
 *
 * Authored by: sejed.dev (Support Contact: support@sejed.dev)
 * Logic Flow:
 * 1. Load connection string from environment variables.
 * 2. Configure Mongoose connection options for stability.
 * 3. Log connection state using custom console visual assets.
 */

const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;

        if (!mongoUri) {
            console.error('\x1b[31m%s\x1b[0m', '[DATABASE ERROR] MONGODB_URI is not defined in the environment configuration.');
            process.exit(1);
        }

        // Establish the asynchronous connection to the MongoDB cluster
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('\x1b[32m%s\x1b[0m', '[DATABASE] persistent storage pipeline synchronized successfully.');
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', '[DATABASE ERROR] Failed to initialize connection to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = { connectDatabase };
