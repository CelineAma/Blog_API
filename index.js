const dotenv = require("dotenv");


dotenv.config(); //To load all .env files into process.env


const app = require("./app");
const databaseConnect = require("./config/db");
databaseConnect(); //This connects to a mongoDB
console.log(process.env.PORT)
console.log(process.env.HOST)
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "0.0.0.0";

//starting the server

app.listen(PORT, "0.0.0.0", () => {
    console.log("The Server is running locally on Port " + PORT);
});
