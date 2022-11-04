const blogModel = require("../model/blogModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
new ObjectId()

// const jwt = require("jsonwebtoken");


// const generateToken = function (user) {
//     const payload = {user}
//     const token = jwt.sign(payload, process.env.JWT_SECRET,
//     {
//         expiresIn: process.env.JWT_EXPIRY_TIME,
    
//     });
    
//     return token;
// };



//to create blog
exports.createBlog = async (rep, res, next) => {

    try {
                                        // const {firstName, lastName, email, phoneNumber, password} = req.body;
    const blogAttributes = {...req.body, author: req.user._id}
    const blog = await blogModel.create(blogAttributes);
        
    //     {
    //     firstName, 
    //     lastName, 
    //     email, 
    //     phoneNumber, 
    //     password
    // });

    // user.password = undefined;
    // const token = generateToken(user);


    return res.status(201).json({
        status: "Success!",
        token,
        data: {blog},
    });
}
    catch (error)
    {
        return next(error);
    }
};


//All logged in and not logged in users should be able to access all published blogs

exports.getPublishedBlog = async (rep, res, next) => {

    try {
       const filter = {"state": "published"}
        const blog = await blogModel.find(filter);

        return res.status(201).json({
            status: "success",
            data: {blog},
        });
    }
        catch (error)
        {
            return next(error);
        }
    };

//updating blog by the user to published
    exports.updateBlog = async (rep, res, next) => {

        try {
            const { blogId }  = req.params;
            const toBeUpdatedBlog = await blogModel.findById(blogId);

            if(!toBeUpdatedBlog) 
            return next(new Error("The blog does not exist"));

            if(toBeUpdatedBlog.author.toString() !== req.user._id)
            return next(new Error("No permission to edit"));

            const updatedBlog = await blogModel.findByIdAndUpdate(blogId, req.body, {new: true, runValidators: true});
            
            return res.status(200).json({
                status: "success",
                data: {updatedBlog},
            });
        }
            catch (error)
            {
                return next(error);
            }
        };


//delete blog
exports.deleteBlog = async (rep, res, next) => {

    try {
        const { blogId }  = req.params;

        const toBedeletedBlog = await blogModel.findById(blogId);

        if(!toBeDeletedBlog) 
        return next(new Error("The blog does not exist"));

        if(toBeDeletedBlog.author.toString() !== req.user._id)
        return next(new Error("No permission to delete"));


        const deletedBlog = await blogModel.findByIdAndDelete(blogId);

        if(!deletedBlog) 
        return next(new Error("The blog does not exist"));

        return res.status(204).json({
            status: "success",
            data: null,
        });
    }
        catch (error)
        {
            return next(error);
        }
    };

//to get all the blogs by ID
exports.getBlogByID = async (rep, res, next) => {

    try {
        const { blogId }  = req.params;
        
        const blog = await blogModel.findOne({_id:  blogId, state: "published"});
        if(!blog) 
        return next(new Error("The blog does not exist"));
        return res.status(200).json({
            status: "success",
            data: {blog},
        });
    }
        catch (error)
        {
            return next(error);
        }
    };





// exports.signIn = async (rep, res, next) => {

//     try {
//     const {email, password} = req.body;


// //To confirm if the user provided email and password.
//     const user = await userModel.findOne({
//         email
//     });
//     if (!user) return next(new Error("User not Found!"))

//     const isCorrectPassword = await user.isCorrectPassword(password)
//     if (!isCorrectPassword) return next(new Error("Incorrect Password!"))

//     user.password = undefined;
//     const token = generateToken(user);


//     return res.status(201).json({
//         status: "Success!",
//         token,
//         data: {user},
//     });
// }
//     catch (error)
//     {
//         return next(error);
//     }
// };