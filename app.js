const express = require("express");
const app = express(); //The app connects to express

const passport = require("passport");


const authRouter = require("./route/authRoute")
const blogRouter = require("./route/blogRoute")


app.use(passport.initialize()) //this initializes the passport
require("./middleware/passport");

app.use(express.urlencoded({extended: false})); //this parses urlencoded body to javascript object.
app.use(express.json()); //This parses json body to javascript object.


app.use("/auth", authRouter);
app.use("/blog", blogRouter);


// app.post("/signup", async (req, res, next) => {});
// app.post("/signin", async (req, res, next) => {});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error!";
    return res.status(statusCode).json({status: "Failed", message});
});


module.exports = app; 