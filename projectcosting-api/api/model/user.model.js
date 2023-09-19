const mongoose = require("mongoose");
const constants = require("../constants");
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, constants.MONGODB_VALIDATION.USER.NAME_REQUIRED]
        },
        email: {
            type: String,
            unique: true,
            required: [true, constants.MONGODB_VALIDATION.USER.EMAIL_REQUIRED]
        },
        password: {
            type: String,
            required: [true, constants.MONGODB_VALIDATION.USER.PASSWORD_REQUIRED]
        },
    },
    { timestamps: true }
);

const User = model('User', userSchema, constants.MONGODB_MODEL.USERS);
module.exports = User;