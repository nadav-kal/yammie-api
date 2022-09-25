const Order = require('../models/order');
const moment = require('moment');


module.exports.createOrders = () => {
        // order from start of yesterday
        const order1 = new Order({
            user: "Nadav",
            products: [
                {
                    name: "Pizza",
                    price: 10
                },
                {
                    name: "Chips",
                    price: 8
                },
                {
                    name: "Water",
                    price: 3
                }
            ],
            date: moment().subtract(1, 'days').startOf('day')
        });

        // order from end of yesterday
        const order2 = new Order({
            user: "Dani",
            products: [
                {
                    name: "Hamburger",
                    price: 10
                },
                {
                    name: "Coca-Cola",
                    price: 5
                }
            ],
            date: moment().subtract(1, 'days').endOf('day')
        })

        // order from yesterday
        const order3 = new Order({
            user: "Moshe",
            products: [
                {
                    name: "Salad",
                    price: 10
                }
            ],
            date: moment().subtract(1, 'days')
        })

        // order from today
        const order4 = new Order({
            user: "Neta",
            products: [
                {
                    name: "Steak",
                    price: 25
                }
            ],
            "date": moment()
        })

        const orders = [order1, order2, order3, order4];
        return orders;
}

module.exports.createOrder = () => {
    
    const order = new Order({
        "user": "Nadav",
        "products": [
            {
                "name": "Pizza",
                "price": 10,
                "_id": "632ebcb42675289bbbbf66e9"
            },
            {
                "name": "Chips",
                "price": 8,
                "_id": "632ebcb42675289bbbbf66ea"
            },
            {
                "name": "Water",
                "price": 3,
                "_id": "632ebcb42675289bbbbf66eb"
            }
        ],
        "totalPrice": 21,
        "date": moment().subtract(1, 'days').startOf('day'),
        "_id": "632ebcb42675289bbbbf66e8",
        "__v": 0
    });
    
    return order;
}