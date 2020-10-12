require('dotenv').config();
const jwt = require('jsonwebtoken'); // Useful to decode a token

// Authentication middleware
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Gets the token from the request header 'Authorization'
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) { // If there is a userId in the request body and if it's not the same as the one in the token...
            throw new Error('User ID non valable');
        } else { // If userIds match = our user is authenticated...
            next();
        }
    } catch(error) {
        res.status(401).json({ error: error.message });
    }
};
