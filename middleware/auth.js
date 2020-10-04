const jwt = require('jsonwebtoken'); // Useful to decode a token

// Authentication middleware
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Gets the token from the request header 'Authorization'
        const decodedToken = jwt.verify(token, 'tf9QvVw1PfjHCfLnta5oWfO4psliZU6RLF28sbmmCRntLhFLcxN2oCrZXIPlgI4Jc4nN1YwnODYEpw74xvte6FviMGDJx8jfLlsQaH0gAaZVYVrXU7QeAs6NYG1Ls4JuH5ICbUTHhNkpRdeQirlJvQMeFLZlKwVX5ow0VI1EWeSXDOQJFKXsHbraDZl2hLdf7PANcDQlAR3MAms5cYtChBJf8r00fFY8gyQkDsqYJF2ShFGgDxCzpOgs5Zb1mpYtPHyHcY0akuIKgdtzjgCZDCInFPaGq6SRsdJuf1mQK1MONdqlKLatjTaaHkyeXZHdflgtvSEmwCLO8c6rkhL3Cmgk5rbTDGYHWcrgnVALrA7aAaNjP3LXQGL713bljaPP2VaoLWHpqgAfTN4bcXsLK8V1NsU7O81W2aOMhSaGQ0XGE0D3J7QvYxcXovtZ6XPpDCaMgJbhcwMJszRJ2wXzBT939UNzJCYJea5MjANzDfU70IBc6EAi'); // Decodes the token thanks to the secret key we used to create the token
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
