const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new Schema({
    title: {
        type: String,
        trim: true,
        maxLength: 35,
        unique: true,
        required: [true, "Please provide your title"],
    },

    description: {
        type: String,
        trim: true,
        required: [true, "Your Description Here..."],
    },

    author_id: {
        type: ObjectId,
        ref: "User",
        required: [true, "Input Author's required"],
    },

    author: {
        type: String,
        required: [true, "Author's name is required"],
    },

    state: {
        type: String,
        default: "draft",
        unique: true,
        enum: ["draft", "published"],
    },

    read_count: {
        type: Number,
        default: 0,
    },

    reading_time: {
        type: Number,
    },

    tags: {
        type: String,
        trim: true,
        required: [true],
    },

    body: {
        type: [String],
        trim: true,
        required: [true, "Body Message of the blog"],
    },

    timestamp: {
        type: Date,
        default: Date.now(),
    },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
