const Order = require('../models/order');
const testOrders = require('./createOrders');
const { expect } = require("chai");
const mongoose = require("mongoose");
const order = require('../models/order');
const moment = require('moment');


beforeEach((done) => {
  mongoose.connect("mongodb://localhost:27017/yammie-test", 
  { useNewUrlParser: true, useUnifiedTopology: true },
    () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

describe("Yammie API Unit Tests", function () {

    describe("Save Order functionality", function () {
      
      it("should successfully add a order", async function () {

        const testOrder = testOrders.createOrder();
        const user = testOrder.user;
        const products = testOrder.products;
        const order = new Order({user, products});
        const returnedOrder = await order.save();
        expect(returnedOrder.user).to.equal(user);
        products.map((product, index) => {
          expect(returnedOrder.products[index].name).to.equal(product.name);
          expect(returnedOrder.products[index].price).to.equal(product.price);  
        });
      });
    });


describe("Get last day orders", function () {

  it("should successfully return the first three orders that was ordered yesterday", async function () {

    const orders = testOrders.createOrders();
    const yesterdayStart = new Date(moment().subtract(1, 'days').startOf('day'));
    const yesterdayEnd = new Date(moment().subtract(1, 'days').endOf('day'));
    // console.log(orders)
    const returnedOrders = [];
    orders.forEach(async (order) => {
      if(order.date >= yesterdayStart && order.date <= yesterdayEnd) {
        returnedOrders.push(order);
      }

    });
    expect(returnedOrders.length).to.equal(3);
    for(let i = 0; i < returnedOrders.length; i++) {
      expect(returnedOrders[i].user).to.equal(orders[i].user);
      orders[i].products.map((product, index) => {
        expect(returnedOrders[i].products[index].name).to.equal(product.name);
        expect(returnedOrders[i].products[index].price).to.equal(product.price);  
      });
    }

    });
  });

});
