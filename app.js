require('dotenv').config();
const express = require('express');  // Useful to create Express applications
const bodyParser = require('body-parser'); // Useful to transform requests body to JSON (ie usable JS objets)
const mongoose = require('mongoose'); // Useful to connect the app to the MongoDB database
const path = require('path'); // Useful to get the path to our server files system
const helmet = require('helmet'); // Useful to set secured HTTP headers
const mongoSanitize  = require('express-mongo-sanitize'); // Useful to sanitize user-supplied data to prevent MongoDB Operator Injection

const sauceRoutes = require('./routes/sauce'); // Imports sauce router
const userRoutes = require('./routes/user'); // Imports user router

const requestsRateLimiter = require('./middleware/rate-limit-configs/all-routes-rate-limit-config'); // Imports the middleware which sets the max number of requests to 100 in 5min

const app = express(); // Creates an Express app

// Connects the API to MongoDB database (thanks to Mongoose)
mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Configures specific response object headers to avoid CORS errors (middleware applied to all routes)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Gives access to all origins
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //  In response to a preflight request, indicates which HTTP headers can be used during the actual request
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Allows to use these methods when accessing the resource in response to a preflight request
    next();
});

app.use(helmet()); // Sets secured HTTP headers on all routes requests
app.use(requestsRateLimiter); // Sets the max number of requests to 100 in 1h on all routes
app.use(mongoSanitize()); // Removes any data containing prohibited characters from requests made to all routes
app.use(bodyParser.json()); // Transforms requests body to JSON (ie usable JS objects) (middleware applied to all routes)

app.use('/images', express.static(path.join(__dirname, 'images'))); // Adds this router manager to requests made to /images, which tells Express to serve the folder images

app.use('/api/sauces', sauceRoutes); // To register the sauce router for all requests made to /api/sauces
app.use('/api/auth', userRoutes); // To register the user router for all requests made to /api/auth

module.exports = app; // Exports the app
