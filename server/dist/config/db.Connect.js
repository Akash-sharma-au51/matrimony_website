"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const connecttoDb = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error('MONGO_URI is not set in environment');
        }
        if (!/^mongodb(\+srv)?:\/\//.test(uri)) {
            throw new Error('MONGO_URI must start with mongodb:// or mongodb+srv://');
        }
        // Validate SRV host to avoid cryptic ENOTFOUND errors
        if (uri.startsWith('mongodb+srv://')) {
            const parsed = new URL(uri);
            const host = parsed.hostname;
            if (!host.includes('.')) {
                throw new Error(`MONGO_URI mongodb+srv host looks invalid: "${host}"`);
            }
        }
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log('connected to mongodb');
    }
    catch (error) {
        console.error(`error connecting to mongodb:${error}`);
        throw error;
    }
};
module.exports = connecttoDb;
