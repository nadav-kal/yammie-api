const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const Product = require('./product').schema;

const OrderSchema = new Schema({
    user: {
        type: String,
        ref: 'User', 
        required: true
    },
    products: [Product],
    totalPrice: {
        type: Number,
        default: 0,
        required: true
    },
    date: {
        type: String,
        default: moment(),
        required: true
    }
})

module.exports = mongoose.model('Order', OrderSchema);