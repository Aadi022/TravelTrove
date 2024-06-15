# TravelTrove

This is a dynamic backend application for organizing Travel Packages. The frameworks and databases used are NodeJS, ExpressJS, and MongoDB. MongoDB Compass is used for locally connecting to the backend server and storing the data. It consists of three databases: User, Admin, and TravelPackages.

## Functionalities

### User
- **View Travel Packages:** The user can view all the available travel packages.
- **Purchase Travel Packages:** The user can buy travel packages.
- **View Purchased Packages:** The user can view all their purchased packages.

### Admin
- **Create Travel Package:** The admin can add new travel packages to the database.
- **View Travel Packages:** The admin can view all the available travel packages.
- **Update Travel Package:** The admin can update the price, number of days, or description of an existing travel package.
- **Delete Travel Package:** The admin can delete a travel package.

## Databases and Schemas

### User
Stores user information.
- **Schema:**
  - `username`: String
  - `password`: String
  - `purchasedPackages`: Array of package IDs

### Admin
Stores admin information.
- **Schema:**
  - `username`: String
  - `password`: String

### TravelPackage
Stores details of travel packages for various destinations.
- **Schema:**
  - `destination`: String
  - `numberOfDays`: Number
  - `price`: Number
  - `description`: String

## Middlewares

### adminsignin.js
- Finds the entered username in the admin database.
- If it exists, the program flow continues to the routing function.
- If not, responds with an "invalid username" message.

### usersignin.js
- Finds the entered username in the user database.
- If it exists, the program flow continues to the routing function.
- If not, responds with an "invalid username" message.

### admin.js
- Verifies the JWT token passed in the authorization header.
- If valid, the program flow continues to the routing function.
- If not, responds with a message to pass the correct JWT token.

### user.js
- Verifies the JWT token passed in the authorization header.
- If valid, the program flow continues to the routing function.
- If not, responds with a message to pass the correct JWT token.

### register.js
- Used when the user/admin is registering.
- Checks if the username is in the correct format (as an email address).
- Checks if the password is a minimum of 6 characters.

## Admin Routes
1. `"/signup"` - Register a new admin. Calls middleware in check.js.
2. `"/signin"` - Admin login. If credentials are correct, returns a JWT token. Calls middleware from adminsignin.js.
3. `"/createpackage"` - Create a new travel package. Calls middleware from admin.js.
4. `"/update/days"` - Update the `numberOfDays` property of an existing package. Calls middleware from admin.js.
5. `"/update/price"` - Update the `price` property of an existing package. Calls middleware from admin.js.
6. `"/update/description"` - Update the `description` property of an existing package. Calls middleware from admin.js.
7. `"/delete"` - Delete an existing package. Calls middleware from admin.js.
8. `"/readall"` - Display all available travel packages. No middleware required.
9. `"/read"` - Display a specific travel package by its `_id`.

## User Routes
1. `"/signup"` - Register a new user. Calls middleware in check.js.
2. `"/signin"` - User login. If credentials are correct, returns a JWT token. Calls middleware from usersignin.js.
3. `"/readall"` - Display all available travel packages. No middleware required.
4. `"/purchase"` - Purchase a specific travel package. Updates the user's database with the package `_id`. Calls middleware from user.js.
5. `"/readpackage"` - Display all travel packages previously bought by the user. Calls middleware from user.js.

## Main File
- **index.js** - Defines the port and handles the initial routing. Routes `/admin` or `/user` requests to their respective handlers in `routes/admin.js` or `routes/user.js`.

## Additional Frameworks Used
- **Mongoose**
- **jsonwebtoken**
- **zod**
- **body-parser**

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/travel-packages-backend.git
