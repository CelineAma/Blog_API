const express = require("express");
const supertest = require("supertest");

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;


const app = require("../app")


beforeAll((done) =>{

    mongoose.connect(TEST_DATABASE_URL);
    mongoose.connection.on("connected", async () => {
        console.log("Connection to MongoDB is Successful");
});


mongoose.connection.on ("error", (err) => {
    console.log("There's an Error connecting to MongoDB", err);
});

done();

});

afterAll((done) => {
    mongoose.connection.close(done);
});

//to test for the signing up user details
test('sign up', async () => { 
    const userDetails = {
        firstName: "John",
        lastName: "Doe",
        email: "doe@yahoo.com",
        phoneNumber: 2348039384000,
        password: "mypassword4"
    }
    
const res = await supertest(app).post("/auth/signup").set("content-type", 'application/x-www-form-urlencoded').send(userDetails);
// console.log(res.body);

expect(res.body.status).toBe("success");
expect(res.statusCode).toBe(201);

});

//to test for signing in user details
test('sign in', async () => { 
    const userDetails = {
        email: "doe@yahoo.com",
        password: "mypassword4"
    }
    
const res = await supertest(app).post("/auth/signin").set("content-type", 'application/x-www-form-urlencoded').send(userDetails);
// console.log(res.body);

expect(res.body.status).toBe("success");
expect(res.statusCode).toBe(200);

});

