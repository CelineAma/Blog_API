const express = require("express");

const {createBlog} = require("../controller/blogController");


const blogRouter = express.Router();


blogRouter.post("/", createBlog);


module.exports = blogRouter;