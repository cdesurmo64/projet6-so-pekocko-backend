const express = require('express'); // Useful to create a router
const router = express.Router(); // Creates router

const userCtrl = require('../controllers/user'); // Imports User controller
const verifyPassword = require('../middleware/verify-password'); // Imports the middleware which verifies passwords
const loginRateLimiter = require('../middleware/login-rate-limit-config'); // Imports the middleware which sets the number of login intents to 3 in 1h

router.post('/signup', verifyPassword, userCtrl.signup);  // Applies the verifyPassword middleware, and then the signup function from User controller to POST requests made to /signup
router.post('/login', loginRateLimiter, userCtrl.login); // Applies login function from User controller to POST requests made to /login

module.exports = router; // Exports User router
