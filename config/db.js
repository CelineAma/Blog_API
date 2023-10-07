const mongoose = require("mongoose");


//To connect the mongodb database
module.exports = function () {
    const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;
    
    mongoose.set('strictQuery', true);
    mongoose.set('strictPopulate', false);
    mongoose.connect(MONGODB_CONNECTION_URL);
    mongoose.connection.on("connected", async () => {
        console.log("Connection to MongoDB is Successful");
});


mongoose.connection.on ("error", (err) => {
    console.log("There's an Error connecting to MongoDB", err);
});


};
