# Yammie-api

This is a Backend API for restaurant build using Node.js, Express.js and MongoDB.

## How to use

1. Download and install MongoDB from [here](https://www.mongodb.com/docs/manual/installation/).
2. Clone this repository to your computer.
3. From the terminal, enter into this repository.
4. Run ```npm install``` for install node modules.
5. Run ``` node app.js``` to start the server.

## How to run tests
Run ```npm run test```

# API Reference

**Note: The date of a order is in UTC representation.**

### Save new order

#### **```POST /neworder```** ####

#### Example request:
  
  ```
  {
      user: "Nadav",
      products: [
          {
              "name": "Hamburger",
              "price": 25,
          },
          {
              "name": "Coca-Cola",
              "price": 5,
          }
      ]
  }
    
```
  
### Get all orders from the last day

#### **```GET /lastdayorders```** ####

#### Example response:
  
  ```
[
    {
        "_id": "633040ccae066575bea4ae9a",
        "user": "Nadav",
        "products": [
            {
                "name": "Hamburger",
                "price": 25,
                "_id": "633040ccae066575bea4ae9b"
            },
            {
                "name": "Coca-Cola",
                "price": 5,
                "_id": "633040ccae066575bea4ae9c"
            }
        ],
        "totalPrice": 30,
        "date": "2022-09-23T21:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "633040f3a479f3adac30ec32",
        "user": "Moshe",
        "products": [
            {
                "name": "Pizza",
                "price": 15,
                "_id": "633040f3a479f3adac30ec33"
            },
            {
                "name": "Water",
                "price": 3,
                "_id": "633040f3a479f3adac30ec34"
            }
        ],
        "totalPrice": 18,
        "date": "2022-09-24T20:59:59.999Z",
        "__v": 0
    }
]
```


