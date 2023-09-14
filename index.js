const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env files into process.env

const app = require("./app");
const databaseConnect = require("./config/db");

// Connect to MongoDB
databaseConnect();

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";

// Start the server
app.listen(PORT, HOST, () => {
    console.log(`The server is running locally on Port ${PORT}`);
});
