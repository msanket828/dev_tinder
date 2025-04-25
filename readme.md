- Create a repository
- initialize the repository
- node_modules, package.json package-lock.json
- install express, nodemon
- create a server, listen on port
- write the request handler for /test, /hello

- Order of the route matters
- mutliple route handlers
- next fn

// all about db and api

- install mongoose
- create db connection
- create user schema
- try to save data (post call), handle error with try and catch
- use express.json middleware to access request body
- make save data api dynamic
- wheever we pass any data in api if those fields are not present in schema then those fields are getting ignored.
- create read update delet for user api
- find diff between put and patch api

// data sanitisation

- validate fn only run on new document creation phase
- while updating existing documents validator fn wont work
- to work we need to add options like optios.runvalidators
- add schema validation with property like trim, lowercase, min, maxLength, required, unique, validate function
- add timestamp: true to check the creation and updation date/time of document.
- app api level validtions on put and patch request
- for schema level validation use validator npm package.

// password encryption

- install bcrypt
- validate signup data
- hash password and save to db
- create login api
- compare password and check email exist or not and throw invalid creds error

// jwt

- install cookie parser and jwt
- send dummy cookie to user on login
- create profile and check can you get the cookie back
- jwt logic (In login api after email and password validation create a JWT token and send it to user)
- read the cookie inside your profile API and find the logged in user

// auth middleware

- auth middleware : read the token from req cookie | valiate the token | find the user
- add the userAuth middleware in profile api
- set expiry to jwt token and for cookie as well
- create user schema methods for getJWT() and comparePassword
