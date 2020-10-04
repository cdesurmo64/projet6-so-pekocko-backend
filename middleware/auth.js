const jwt = require('jsonwebtoken'); // Useful to decode a token

// Authentication middleware
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Gets the token from the request header 'Authorization'
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Decodes the token thanks to the secret key we used to create the token
        const userId = decodedToken.userId; // Gets the userId contained in the decoded token
        if (req.body.userId && req.body.userId !== userId) { // If there is a userId in the request body and if it's not the same as the one in the token...
            throw new Error('User ID non valable'); // displays an error
        } else { // If userIds match = our user is authenticated...
            next(); // passes the execution to the next middleware
        }
    } catch(error) { // Catches the possible errors in try{} execution
        res.status(401).json({ error: error.message }); // Displays the error message of the error collected
    }
};
