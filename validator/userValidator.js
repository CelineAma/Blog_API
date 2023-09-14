// validator.js
const { body } = require("express-validator");

const validateUser = [
    body("firstName")
        .isLength({ min: 2 })
        .withMessage("First name should be at least 2 characters long"),

    body("lastName")
        .isLength({ min: 2 })
        .withMessage("Last name should be at least 2 characters long"),

    body("email")
        .isEmail()
        .withMessage("Invalid email address"),

    body("phoneNumber")
        .isLength({ min: 14 })
        .withMessage("Invalid phone number"),

    body("password")
        .isLength({ min: 8 })
        .withMessage("Password should be at least 8 characters long"),
];

module.exports = {
    validateUser,
};
