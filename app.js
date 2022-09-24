const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Order = require('./models/order')
const User = require('./models/user')
const moment = require('moment');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
// const yammieRoutes = require('./routes/yammie');


mongoose.connect('mongodb://localhost:27017/yammie', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send("Welcome to Yammie!");
})

// app.post('/user', async(req, res) => {
//     const user = new User(req.body);
//     await user.save();
//     res.send(user);
// })

app.post('/neworder', catchAsync(async (req, res, next) => {
    if(!req.body.order) {
        throw new ExpressError('Invalid Order Data', 400);
    }
    const order = new Order(req.body.order);
    order.totalPrice = Object.values(order.products).reduce((t, {price}) => t + Number(price), 0);
    await order.save();
    await db.collection("orders").dropIndexes();
    res.send(order);
}))

app.get('/lastdayorders', catchAsync(async (req, res) => {
    const yesterdayStart = moment().subtract(1, 'days').startOf('day');
    const yesterdayEnd = moment().subtract(1, 'days').endOf('day');
    const ordersFromYesterday = await Order.find({ "date": { "$gte": yesterdayStart, "$lte": yesterdayEnd }});
    res.send(ordersFromYesterday);
}))

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})


app.use((err, req, res, next) => {
    const {statusCode = 500, message = "Something went wrong"} = err;
    res.status(statusCode).send(message);
})

let server = app.listen(3000, () => {
    console.log("Serving on port 3000");
})

module.exports = server;