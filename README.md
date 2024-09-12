# [NodeJs] Tiny eCommerce

## Requirements:

A small start-up called "Tiny-eCommerce" wants to build an online shopping application to sell their products. To quickly enter the market, they are aiming for a version with minimal features:

- A single-page web application that displays all products, allowing customers to filter, sort, and search for products based on criteria like name, price, brand, color, etc.
- A backend to handle requests from the frontend, such as displaying products, filtering, sorting, and searching.
- If a customer finds a product they like, they can only place an order by calling the company's Call Centre.
- To support sales and marketing, all customer activities—such as searching, filtering, and viewing product details—should be tracked and stored in the database.
- No customer registration is required.
- No online payment is required.
- You are responsible for designing and implementing the backend services. There is no need to build the frontend application.

## Business Domain Boundaries

- Authentication/Authorization for internal endpoints
- Brand management (CRUD)
- Color management (CRUD)
- Product management (CRUD). Note: advanced search, filter, and sort functionality is required.
- Activity tracking (Insert, advanced search, filter, and sort functionality)

## Technical Design Approach

- **Simple and maintainable** — The system should be easy to understand and maintain for all levels of engineers. A simple, reliable system will also help troubleshoot production issues more quickly. This is the highest priority when building this application.
- **Adopt key design principles and patterns** — such as KISS, SOLID, Singleton, IoC, Builder, and Chain of Responsibility.
- **Follow the [12-factor](https://12factor.net/) methodology**.
- **Lightweight dependencies** — Select stable (LTS), well-supported, popular, well-documented, and easy-to-understand libraries with no known issues. Avoid adding unnecessary dependencies to maintain simplicity.
- **Stateless and lightweight** — The application should be lightweight and stateless to support scaling on demand.
- Given the current requirements, a **microservices architecture** is suitable. The system can be split into three services:
  - Product Service
  - Activity Tracking Service
  - RabbitMQ

This approach allows development teams to work independently with their own business and technical stack, speeding up overall development.

## Business Context Overview

![Business context overview](images/C4-level-1.svg)

## API Components

![API components](images/C4-level-2.svg)

## How to Run

### Prerequisites:

- **MongoDB**: You can set up MongoDB locally or use a cloud instance. This example uses a local MongoDB setup via Docker Compose.
- **RabbitMQ**: This example sets up RabbitMQ locally via Docker Compose.

**Note**: Ensure Docker and Docker Compose are installed on your machine.

### Running Services with Docker Compose:

- From the `docker-local-setup` folder:
  - Development mode:
    - `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up`
  - Production mode:
    - `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up`

### Running Individual Services:

- **MongoDB & RabbitMQ**:
  - From the `docker-local-setup` folder, run:
    - `docker-compose -f external-services.yml up`

- **Product Service**:
  - Navigate to the `product-service` folder and run:
    - `npm install`
    - `npm run dev` (development mode)
    - `npm run start` (production mode)
    - `npm run test` (run tests)

- **Tracking Service**:
  - Navigate to the `tracking-service` folder and run:
    - `npm install`
    - `npm run dev` (development mode)
    - `npm run start` (production mode)
    - `npm run test` (run tests)

### Product Service

#### Detailed information can be found [HERE](./product-service/README.md).

#### Database Diagram

![Product service database diagram](images/product-service-database-diagram.svg)

### Example Data

```{
    "_id" : ObjectId("61faa04b1df0d83963fe6257"),
    "name" : "Refined Fresh Sausages",
    "code" : "9VY8EUIPYP",
    "title" : "Refined Fresh Sausages Small Orn, Grimes and Kunze",
    "description" : "Odio dolor repellat molestiae omnis.",
    "price" : 829.43,
    "brand" : {
        "id" : ObjectId("61faa04a1df0d83963fe61db"),
        "name" : "Wiza - Bednar"
    },
    "images" : [
        "http://placeimg.com/640/480/cats",
        "http://placeimg.com/640/480/fashion",
        "http://placeimg.com/640/480/abstract"
    ],
    "colors" : [
        {
            "id" : ObjectId("61faa04a1df0d83963fe61ea"),
            "name" : "sky blue",
            "code" : "#8E9A8B",
            "images" : [
                "http://placeimg.com/640/480/people"
            ],
            "_id" : ObjectId("61faa04b1df0d83963fe6252")
        },
        {
            "id" : ObjectId("61faa04a1df0d83963fe61f6"),
            "name" : "orchid",
            "code" : "#9AA635",
            "images" : [
                "http://placeimg.com/640/480/business",
                "http://placeimg.com/640/480/animals",
                "http://placeimg.com/640/480/cats"
            ],
            "_id" : ObjectId("61faa04b1df0d83963fe6253")
        },
        {
            "id" : ObjectId("61faa04a1df0d83963fe61f8"),
            "name" : "mint green",
            "code" : "#0E465C",
            "images" : [
                "http://placeimg.com/640/480/abstract"
            ],
            "_id" : ObjectId("61faa04b1df0d83963fe6254")
        }
    ],
    "attributes" : [
        {
            "name" : "Has wifi",
            "value" : false
        },
        {
            "name" : "Hot sales",
            "value" : false
        },
        {
            "name" : "Notes",
            "value" : "Debitis consequuntur voluptatem ut aliquam sit explicabo ad rem qui."
        }
    ],
    "createdAt" : ISODate("2022-02-02T15:16:26.990+0000"),
    "updatedAt" : ISODate("2022-02-02T15:16:26.846+0000")
}
```

#### Sample CURL

##### Product

###### GET /products

Sequence diagram:

![Get Product Sequence Diagram](images/get-products-sequence-diagram.svg)

Basically, the GET /products enable to paginate and search/filter/sort all fields of a product and all fields of its relatives (brand, color). Here are a few sample commands. You can discover further on it.

Example:

`curl -X GET http://localhost:3000/v1/products?name=/car/i&brand.name=Wiza%20-%20Bednar&price>=200&limit=10&page=1&sort=-name \ --header 'Content-Type: application/json'`

=> Get all products with:

- **name** containing 'car' and
- **brand name** equal 'Wiza - Bednar' and
- **price** greater than or equal 200
- then order by **name** descending and
- took top 10 items.

`curl -X GET http://localhost:3000/v1/products?colors.name=pink&price>500&price<=700&limit=10&page=1&sort=-brand.name,name \ --header 'Content-Type: application/json'`

=> Get all products with:

- **color** = 'pink' and
- **price** >= 500 and <= 700
- then order by **brand name** descending and **name** ascending
- took top 10 items.

`curl -X GET http://localhost:3000/v1/products?filter={"$or":[{"colors.name":"yellow"},{"brand.name":"Rath, O'Reilly and Roob"}]}&limit=20&page=1&sort=-name \ --header 'Content-Type: application/json'`

=> Get all products with:

- **color** = 'yellow' **or**
- **brand name** = 'Rath, O'Reilly and Roob'
- then order by **name** descending
- took top 20 items.

More info about the api query params [here](https://www.npmjs.com/package/api-query-params).

##### Brand & Color

Same as product above.

`curl -X GET http://localhost:3000/v1/brands?name=/O'Reilly/i&limit=20&page=1&sort=-name \ --header 'Content-Type: application/json'`

=> Get all brands with:

- **name** contains 'O'Reilly'
- then order by **name** descending
- took top 20 items.

`curl -X GET http://localhost:3000/v1/colors?name=yellow \ --header 'Content-Type: application/json'`

=> Get all colors with:

- **name** = 'yellow'

### Activity Tracking Service

#### More detail [HERE](./tracking-service/README.md)

Example data:

```
"_id": "61f67217450fb455323f937b",
"actionType": "Product.GetListWithConditions",
"data": [
    {
      "requestInfo": {
        "corelationId": "aa91a3b1-cd6f-4c26-92da-605516ece2cd",
        "ip": "::1",
        "ips": [],
        "method": "GET",
        "originalUrl": "/v1/products?name=/car/i&price%3E500",
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
        "time": "2022-01-30T11:09:54.032Z"
      },
      "filter": {
        "name": "/car/i",
        "price": {
            "$gt": 500
        }
      }
    }
],
"createdAt": "2022-01-30T11:10:15.635Z",
"updatedAt": "2022-01-30T11:10:15.635Z"
```

Create user

`curl -X POST http://localhost:3030/users \ -H 'content-type: application/json' \ -d '{"email": "test@gmail.com", "password": "123456"}' `
Note: Default user: email: admin@local.com, password: admin

Get access token:

`curl -X POST http://localhost:3030/authentication/ \ -H 'content-type: application/json' \ -d '{ "strategy": "local", "email": "admin@local.com", "password": "admin" }' `

Get activities:

`curl -X GET 'http://localhost:3030/v1/activities?data.requestInfo.corelationId=aa91a3b1-cd6f-4c26-92da-605516ece2cd' \ -H 'authorization: <access_token_here>' `

=> Get activities with:

- accorelationId = 'aa91a3b1-cd6f-4c26-92da-605516ece2cd'
- default limit = 10
- default page = 1
- default sort = createdAt

`curl -X GET 'http://localhost:3030/v1/activities?actionType=Product.GetListWithConditions' \ -H 'authorization: <access_token_here>' `

=> Get activities with:

- actionType = 'Product.GetListWithConditions'
- default limit = 10
- default page = 1
- default sort = createdAt

### External services management

- MongoDb: http://localhost:27017
- RabbitMQ: http://localhost:15672 username: guest, password: guest
- Seq: http://localhost:8003

### Points to discuss

- Kafka or RabbitMQ?
- Service discovery at application level or infrastructure level?
- DI container or not?
- MongoDb - Embeded document or reference document
