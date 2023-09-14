const express = require("express");
const app = express(); //The app connects to express
const passport = require("passport");
const cors = require("cors");
const authRouter = require("./route/authRoute");
const blogRouter = require("./route/blogRoute");
const rateLimit = require("express-rate-limit");

// Create a rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests per IP within the windowMs time frame
    message: "Too many requests from this IP, please try again later.",
  });

app.use(cors());
app.use(passport.initialize()); //this initializes the passport
require("./middleware/passport");

app.use(express.urlencoded({extended: false})); //this parses urlencoded body to javascript object.
app.use(express.json()); //This parses json body to javascript object.

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blog", blogRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error!";
    return res.status(statusCode).json({status: "Failed", message});
});


module.exports = app; 