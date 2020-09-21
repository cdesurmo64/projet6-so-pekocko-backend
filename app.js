const express = require('express');  // Useful to create Express applications
const bodyParser = require('body-parser'); // Useful to transform requests body to JSON (ie usable JS objets)

const app = express(); // Creates an Express app

// Configures specific response object headers to avoid CORS errors (middleware applied to all routes)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Gives access to all origins
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //  In response to a preflight request, indicates which HTTP headers can be used during the actual request
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Allows to use these methods when accessing the resource in response to a preflight request
    next();
});

app.use(bodyParser.json()); // Transforms requests body to JSON (ie usable JS objects) (middleware applied to all routes)

module.exports = app; // Exports the app
