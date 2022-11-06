const express = require("express");
const supertest = require("supertest");

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;
const TEST_TOKEN = process.env.TEST_TOKEN; //Token that authenticate a user while 'creating' a blog


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

//to test for creating blog details

let blogId;

test('create Blog', async () => {

    const blogDetails = {
        title: "",
        description: "",
        author_id: "",
        author: "",
        tags: [],
        body: "",
    }

    const res = await supertest(app).post("/blog").set("Authorization", `Bearer ${TEST_TOKEN}`).send(blogDetails); //this sets token as header, just as in thunderclient

    blogId = res.body.data.blog._id

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("success")
  });



//to test for updating or editing blog details in published state
test('update Blog', async () => {

    const blogDetails = {
        state: "published"
    }

    const res = await supertest(app).patch(`/blog/ ${blogId}`).set("Authorization", `Bearer ${TEST_TOKEN}`).send(blogDetails); //this sets token as header, just as in thunderclient

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success")
  });


  //to test for getting all the published blog details
test('Get Published Blog', async () => {
    
    const res = await supertest(app).get("/blog");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success")
  });

    //to test for getting all the blog details, both published and draft state
test('get Blog', async () => {
    
    const res = await supertest(app).get(`/blog/ ${blogId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success")
  });

  //to test for destroying or deleting blog details
test('delete Blog', async () => {
    const res = await supertest(app).delete(`/blog/ ${blogId}`).set("Authorization", `Bearer ${TEST_TOKEN}`);
    expect(res.statusCode).toBe(204);
    expect(res.body.status).toEqual({});
  });



