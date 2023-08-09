const express = require("express");

const {signup, signin} = require("../controller/authController");
const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.send("Welcome to Blog API");
});

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);


module.exports = authRouter;
