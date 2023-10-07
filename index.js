const dotenv = require("dotenv");
const http = require('http');
dotenv.config(); // Load environment variables from .env files into process.env

const app = require("./app");
const databaseConnect = require("./config/db");

// Connect to MongoDB
databaseConnect();

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "0.0.0.0";

// Start the server
const server = http.createServer(app);
server.listen(PORT, HOST, () => {
    console.log(`The server is running locally on Port ${PORT}`);
});
