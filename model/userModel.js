const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        minLength: 2,
        trim: true,
        required: [true, "Kindly provide your First Name"],
    },

    lastName: {
        type: String,
        minLength: 2,
        trim: true,
        required: [true, "Kindly provide your Last Name"],
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Kindly provide your email address"],
    },

    phoneNumber: {
        type: String,
    },

    password: {
        type: String,
        minLength: 8,
        trim: true,
        required: [true, "Please, enter your password"],
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;