const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //This is for password encryption


const Schema = mongoose.Schema;


const userSchema = new Schema({

    firstName: {
        type: String,
        minLength: 2,
        trim: true,
        required:[true, "Kindly provide your First Name"],
    },

    lastName: {
        type: String,
        minLength: 2,
        trim: true,
        required:[true, "Kindly provide your Last Name"],
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


userSchema.pre("save", async function (next){
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword
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