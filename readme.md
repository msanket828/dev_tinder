- Create a repository
- initialize the repository
- node_modules, package.json package-lock.json
- install express, nodemon
- create a server, listen on port
- write the request handler for /test, /hello

- Order of the route matters
- mutliple route handlers
- next fn

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
