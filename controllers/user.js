const bcrypt = require('bcrypt'); // Useful to encrypt passwords before saving them in the DB
const User = require('../models/user'); // Imports the data model User

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
                .catch(error => res.status(400).json({ error })); // If it fails to save -> Sends a 400 status and the error in an object
        })
        .catch(error => res.status(500).json({ error })); // If it fails to create the hash -> Sends a 500 status and the error in an object
};
