const bcrypt = require("bcrypt");

// Hash the password in the database
async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}

// Compare entered password with hashed password
async function comparePassword(password, hashedPassword) {
    try {
        const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
        return isCorrectPassword;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    hashPassword,
    comparePassword,
};
