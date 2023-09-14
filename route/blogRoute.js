const express = require("express");
const passport = require("passport");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.get("/", blogController.getPublishedBlog);

router.get("/:blogId", blogController.getBlogByID);

router.post("/create", passport.authenticate("jwt", { session: false }), blogController.createBlog);

// Patched draft state to published
router.patch("/:blogId/update", passport.authenticate("jwt", { session: false }), blogController.updateBlog);

router.delete("/:blogId/delete", passport.authenticate("jwt", { session: false }), blogController.deleteBlog);

module.exports = router;
