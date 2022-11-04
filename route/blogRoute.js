const express = require("express");
const passport = require("passport");
const {createBlog, getPublishedBlog, updateBlog, deleteBlog, getBlogByID} = require("../controller/blogController");


const blogRouter = express.Router();

blogRouter.get("/", getPublishedBlog);

blogRouter.get("/", getBlogByID);

blogRouter.post("/", passport.authenticate ("jwt", {session: false }),
 createBlog );

 //patched draft state to published
blogRouter.patch("/:blogId", passport.authenticate ("jwt", {session: false }),
 updateBlog);
 
 blogRouter.delete("/:blogId", passport.authenticate ("jwt", {session: false }),
 deleteBlog);

module.exports = blogRouter;