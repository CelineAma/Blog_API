const mongoose = require("mongoose");
// const bcrypt = require("bcrypt"); //This is for password encryption


const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


const blogSchema = new Schema({

    title: {
        type: String,
        trim: true,
        maxLength: 35,
        unique: true,
        required:[true, "Please provide your title"],
    },

    description: {
        type: String,
        trim: true,
        required: [true, "Your Description Here..."],
    },

    author_id: {
        type: ObjectId,
        ref: "User",
        required:[true, "Input Author's required"],
    },

    author: {
        type: String,
        required:[true, "Author's name is required"],
    },

    state: {
        type: String,
        default: "draft",
        unique: true,
        enum: ["draft", "published"]
    },

    read_count: {
        type: Number,
        default: 0
    },

    reading_time: {
        type: Number,
    },

    tags: {
        type: String,
        trim: true,
        required:[true],
    },

    body: {
        type: [String],
        trim: true,
        required:[true, "Body Message of the blog"],
    },

    timestamp: {
        type: Date,
        default: Date.now(),
    },
});


// userSchema.pre("Save", async function (next){
//     const hashedPassword = await bcrypt.hash(this.password, 12);
//     next();
// });



// userSchema.methods.isCorrectPassword = async function (enteredPassword){
//     const isCorrectPassword = await bcrypt.compare(
//         enteredPassword,
//         this.password
//     );
//     return isCorrectPassword; 
// };


const blog = mongoose.model("blog", blogSchema);


module.exports = blog;