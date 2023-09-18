const blogModel = require("../model/blogModel");

// Create a new blog
exports.createBlog = async (req, res, next) => {
    try {
        const { title, description, tags, body } = req.body;
        const { _id, firstName, lastName } = req.user;

        const blog = await blogModel.create({
            title,
            description,
            tags,
            body,
            author_id: _id,
            author: `${lastName} ${firstName}`,
        });

        return res.status(201).json({
            status: "Success!",
            data: { blog },
        });
    } catch (error) {
        return next(error);
    }
};

// Get all published blogs with pagination
exports.getPublishedBlog = async (req, res, next) => {
    try {
        const filter = { state: "published" };
        const { limit = 20, skip = 0 } = req.query;

        const blogs = await blogModel
            .find(filter)
            .limit(parseInt(limit))
            .skip(parseInt(skip));

        return res.status(200).json({
            status: "success",
            data: { blogs },
        });
    } catch (error) {
        return next(error);
    }
};

// Update a blog by its ID
exports.updateBlog = async (req, res, next) => {
    try {
        const { blogId } = req.params;
        const toBeUpdatedBlog = await blogModel.findById(blogId);

        if (!toBeUpdatedBlog) {
            return next(new Error("The blog does not exist"));
        }

        if (toBeUpdatedBlog.author_id.toString() !== req.user._id) {
            return next(new Error("No permission to edit"));
        }

        const updatedBlog = await blogModel.findByIdAndUpdate(
            blogId,
            req.body,
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            status: "success",
            data: { updatedBlog },
        });
    } catch (error) {
        return next(error);
    }
};

// Delete a blog by its ID
exports.deleteBlog = async (req, res, next) => {
    try {
        const { blogId } = req.params;
        const toBeDeletedBlog = await blogModel.findById(blogId);

        if (!toBeDeletedBlog) {
            return next(new Error("The blog does not exist"));
        }

        if (toBeDeletedBlog.author_id.toString() !== req.user._id) {
            return next(new Error("No permission to delete"));
        }

        const deletedBlog = await blogModel.findByIdAndDelete(blogId);

        if (!deletedBlog) {
            return next(new Error("The blog does not exist"));
        }

        return res.status(204).json({
            status: "success",
            message: "Blog post deleted successfully.",
        });
    } catch (error) {
        return next(error);
    }
};

// Get a blog by its ID
exports.getBlogByID = async (req, res, next) => {
    try {
        const { blogId } = req.params;
        const blog = await blogModel
            .findById({ _id: blogId, state: "published" })
            .populate("author_id", "-password");

        if (!blog) {
            return next(new Error("The blog does not exist"));
        }

        blog.read_count += 1;
        await blog.save();

        return res.status(200).json({
            status: "success",
            data: { blog },
        });
    } catch (error) {
        return next(error);
    }
};
