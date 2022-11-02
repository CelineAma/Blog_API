const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //This is for password encryption


const Schema = mongoose.Schema;


const userSchema = new Schema({

    firstName: {
        type: String,
        minLength: 2,
        trim: true,
        required:[true, "Kindly provide your First Name"],
        unique: true,
    },

    lastName: {
        type: String,
        minLength: 2,
        trim: true,
        required:[true, "Kindly provide your Last Name"],
        unique: true,
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required:[true, "Kindly provide your email address"],
    },

    phoneNumber: {
        type: Number,
        minLength: 14,
        unique: true,
    },

    password: {
        type: String,
        minLength: 8,
        trim: true,
        required: [true, "Please, enter your password"],
    }
});


userSchema.pre("Save", async function (next){
    const hashedPassword = await bcrypt.hash(this.password, 12);
    next();
});



userSchema.methods.isCorrectPassword = async function (enteredPassword){
    const isCorrectPassword = await bcrypt.compare(
        enteredPassword,
        this.password
    );
    return isCorrectPassword; 
};


const User = mongoose.model("User", userSchema);


module.exports = User;