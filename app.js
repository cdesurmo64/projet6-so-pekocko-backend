const express = require('express');  // Useful to create Express applications

const app = express(); // Creates an Express app

// Configures specific response object headers to avoid CORS errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Gives access to all origins
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //  In response to a preflight request, indicates which HTTP headers can be used during the actual request
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Allows to use these methods when accessing the resource in response to a preflight request
    next();
});

module.exports = app; // Exports the app
