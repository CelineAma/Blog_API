const express = require("express");
const app = express(); //The app connects to express
const passport = require("passport");
const cors = require("cors");
const authRouter = require("./route/authRoute");
const blogRouter = require("./route/blogRoute");
const { apiRateLimiter } = require("./config/ratelimitConfig");

app.use(apiRateLimiter);
app.use(cors());
app.use(passport.initialize()); //this initializes the passport
require("./middleware/passport");

app.use(express.urlencoded({extended: false})); //this parses urlencoded body to javascript object.
app.use(express.json()); //This parses json body to javascript object.

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blog", blogRouter);

app.use("/", (req, res) => {
    res.send("Welcome to Celine's Blog API");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error!";
    return res.status(statusCode).json({status: "Failed", message});
});


module.exports = app; 