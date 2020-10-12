require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt'); // Useful to encrypt passwords before saving them in the DB
const jwt = require('jsonwebtoken'); // Useful to create authentication tokens

// @desc Creates a new user
// @route POST /api/auth/signup
// @access Public
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => { // If the hash creation was a success
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error: error.message }));
        })
        .catch(error => res.status(500).json({ error: error.message }));
};

// @desc To log in
// @route POST /api/auth/login
// @access Public
//
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => { // If communication with the mongoDB succeeded
            if (!user) { // If no user was found for this email
                return res.status(401).json({ error: 'Utilisateur non trouvé !' }); // 401 Unauthorized error
            }
            // If a user was found
            bcrypt.compare(req.body.password, user.password)
                .then(valid => { // If communication with the mongoDB succeeded
                    if (!valid) { // If the user entered the wrong password
                        return res.status(401).json({ error: 'Mot de passe incorrect !' }); // 401 Unauthorized error
                    }
                    // If the user entered the good password
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(  // Creates a random authentication token
                            { userId: user._id }, // ... that includes the userId as payload
                            process.env.TOKEN_KEY,
                            { expiresIn: '12h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error: error.message })); // If communication with the mongoDB DB failed for the password comparison
        })
        .catch(error => res.status(500).json({ error: error.message })); // If communication with the mongoDB SB failed to get the user
};
