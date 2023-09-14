const UserModel = require("../model/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = function (user) {
    const payload = { user };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    return token;
};

exports.signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, lastName, email, phoneNumber, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await UserModel.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword, // Save the hashed password
        });

        user.password = undefined;
        const token = generateToken(user);

        return res.status(201).json({
            status: "Success!",
            token,
            data: { user },
        });
    } catch (error) {
        return next(error);
    }
};

exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate the request body using Express Validator
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // To confirm if the user provided email and password.
        const user = await UserModel.findOne({
            email,
        });

        if (!user) return res.status(404).json({ message: "User not found" });

        const isCorrectPassword = await user.isCorrectPassword(password);

        if (!isCorrectPassword)
            return res.status(401).json({ message: "Incorrect Password" });

        user.password = undefined;
        const token = generateToken(user);

        return res.status(200).json({
            status: "Success!",
            token,
            data: { user },
        });
    } catch (error) {
        return next(error);
    }
};
