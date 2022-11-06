const express = require("express");

const {signup, signin} = require("../controller/authController");
const authRouter = express.Router();


authRouter.post("/signup", signup);
// authRouter.get("/signup", signUp);
authRouter.post("/signin", signin);
// authRouter.get("/signin", signIn);


module.exports = authRouter;