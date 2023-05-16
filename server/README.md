# Toy E-Commerce Website

This is a toy e-commerce website built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to browse and purchase toys online.

## Installation

To install and run the project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/toy-ecommerce-website.git`
2. Install server dependencies: `cd toy-ecommerce-website/server && npm install`
3. Install client dependencies: `cd ../client && npm install`
4. Create a `.env` file in the `server` directory with the following variables:
   ```
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```
5. Start the server: `cd ../server && npm start`
6. Start the client: `cd ../client && npm start`
7. Open the website in your browser at `http://localhost:3000`

## Features

-  User authentication and authorization
-  Browse toys by category
-  Search for toys by name or description
-  Add toys to cart
-  Checkout and place orders
-  View order history

## Technologies Used

-  MongoDB: A NoSQL database used to store toy and user data
-  Express: A Node.js framework used to build the server-side API
-  React: A JavaScript library used to build the client-side UI
-  Node.js: A JavaScript runtime used to run the server-side code
-  Stripe: A payment processing platform used to handle online payments

## Contributing

Contributions are welcome! If you have any suggestions or find any bugs, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
