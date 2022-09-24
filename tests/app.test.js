const server = require('../app');
const Order = require('../models/order');
const moment = require('moment');
const mongoose = require("mongoose");
const request = require('supertest');
const orders = require('./createOrders');
const catchAsync = require('../utils/catchAsync');
const express = require('express');
const app = express();
// const bodyParser = require('body-parser')


beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/JestDB", 
    { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    });
  });


describe("save new order", () => {

    test("POST /neworder", async () => {

        const order = orders.createOrder();

        await request(server).post('/neworder')
        .type('form')
        .send(order)
        .set('Accept', /application\/json/)
        .expect(200)
        .then(async (response) => {

            expect(response.body.user).toEqual(order.user);
            expect(response.body.totalPrice).toEqual(order.totalPrice);
            expect(response.body.date).toEqual(order.date);
      
            const orderFromDB = await Order.findOne({ _id: response.body._id });
            expect(orderFromDB).toBeTruthy();
            expect(orderFromDB.user).toBe(order.user);
            expect(orderFromDB.totalPrice).toBe(order.totalPrice);
            expect(orderFromDB.date).toBe(order.date);

        });

    })
    
})

describe("last day orders", () => {

    test("GET /lastdayorders", async () => {

        const db = mongoose.connection;

        // create 3 orders from yesterday and one from today
        const ordersArr = orders.createOrders();
        for(let i = 0; i < ordersArr.length; i++) {
            await ordersArr[i].save();
            await db.collection("orders").dropIndexes();
        }
        await request(server).get("/lastdayorders").expect(200)
            .then((response) => {
                expect(Array.isArray(response.body)).toBeTruthy();
                expect(response.body.length).toEqual(3);
                for(let i = 0; i < 3; i++) {
                    expect(response.body[i].user).toEqual(ordersArr[i].user);
                    expect(response.body[i].totalPrice).toEqual(ordersArr[i].totalPrice);
                    expect(response.body[i].date).toEqual(ordersArr[i].date);
                }
            })

        
    })
})