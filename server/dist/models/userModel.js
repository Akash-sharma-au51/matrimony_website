"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullname: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "password must be 8 chars long"],
        maxLength: [20, "password must no exceed 20 chars"]
    }
}, {
    timestamps: true
});
const Users = mongoose.model('Users', userSchema);
module.exports = Users;
