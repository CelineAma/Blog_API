const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");


const generateToken = function (user) {
    const payload = {user}
    const token = jwt.sign(payload, process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXPIRY_TIME,
    
    });
    
    return token;
};


exports.signup = async (req, res, next) => {

    try {
    const {firstName, lastName, email, phoneNumber, password} = req.body;
    const user = await userModel.create({
        firstName, 
        lastName, 
        email, 
        phoneNumber, 
        password
    });

    user.password = undefined;
    const token = generateToken(user);


    return res.status(201).json({
        status: "Success!",
        token,
        data: {user},
    });
}
    catch (error)
    {
        return next(error);
    }
};



exports.signin = async (req, res, next) => {
    console.log(req.headers);
    try {
    const {email, password} = req.body;


//To confirm if the user provided email and password.
    const user = await userModel.findOne({
        email
    });

    if (!user) return next(new Error("User not Found!"))

    const isCorrectPassword = await user.isCorrectPassword(password)
console.log(isCorrectPassword, user);

    if (!isCorrectPassword) return next(new Error("Incorrect Password!"))

    user.password = undefined;
    const token = generateToken(user);

    


    return res.status(201).json({
        status: "Success!",
        token,
        data: {user},
    });
}
    catch (error)
    {
        return next(error);
    }
};

