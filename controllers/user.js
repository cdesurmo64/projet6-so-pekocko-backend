require('dotenv').config();
const bcrypt = require('bcrypt'); // Useful to encrypt passwords before saving them in the DB
const User = require('../models/user'); // Imports the data model User
const jwt = require('jsonwebtoken'); // Useful to create authentication tokens

// @desc Creates a new user
// @route POST /api/auth/signup
// @access Public
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // Encrypts the password contained in the request body, doing 10 rounds of encrypting algo
        .then(hash => { // If the hash creation was a success
            const user = new User({  // Creates a new User thanks to the user data model
                email: req.body.email, // Whose email is the one contained in the request body
                password: hash // Whose password is the hash that was created right before
            });
            user.save() // To save the new user in the DB
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' })) // If it succeeds to save -> Sends a 201 status and a msg
                .catch(error => res.status(400).json({ error: error.message })); // If it fails to save -> Sends a 400 status and the error in an object
        })
        .catch(error => res.status(500).json({ error: error.message })); // If it fails to create the hash -> Sends a 500 status and the error in an object
};

// @desc To logging in existing users
// @route POST /api/auth/login
// @access Public
//
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // Search in the DB for a User whose email is the one sent in the request body
        .then(user => { // If communication with the mongoDB succeeded : we get the user
            if (!user) { // If no user was found for this email
                return res.status(401).json({ error: 'Utilisateur non trouvé !' }); // 401 Unauthorized error
            }
            // If a user was found
            bcrypt.compare(req.body.password, user.password) // Compares the request body password with the hash associated to the User found in the DB
                .then(valid => { // If communication with the mongoDB succeeded : we get the a Boolean
                    if (!valid) { // If Boolean = false -> = if the user entered the wrong password
                        return res.status(401).json({ error: 'Mot de passe incorrect !' }); // 401 Unauthorized error
                    }
                    // If Boolean = true -> if they match = if the user entered the good password
                    res.status(200).json({ // Sends back what's excepted by the frontend :
                        userId: user._id, // The userId collected in the DB
                        token: jwt.sign(  // A random authentication token (sign() encodes a new token)
                            { userId: user._id }, // ... that includes the userId as payload (= encrypted data)
                            process.env.TOKEN_KEY, // ...thanks to a secret string to encode the token
                            { expiresIn: '12h' } // ... Tokens being valid for 12h
                        )
                    });
                })
                .catch(error => res.status(500).json({ error: error.message })); // If communication with the mongoDB failed for the password comparison -> Server Error
        })
        .catch(error => res.status(500).json({ error: error.message })); // If communication with the mongoDB failed to get the user -> Server Error
};
