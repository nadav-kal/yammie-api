# Yammie-api

This is a Backend API for restaurant build using Node.js, Express.js and MongoDB.

# API Reference

### Save new order

#### **```POST /neworder```** ####

#### Example request:
  
  ```
  {
        user: "Nadav",
        products: [
            {
                "name": "Steak",
                "price": 25,
                "_id": "633038dc6255bef96e7fac37"
            },
            {
                "name": "Coca-Cola",
                "price": 5,
                "_id": "633038dc6255bef96e7fac38"
            }
        ]
    }
    ```
