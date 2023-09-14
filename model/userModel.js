const mongoose = require("mongoose");

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
});

const User = mongoose.model("User", userSchema);

module.exports = User;