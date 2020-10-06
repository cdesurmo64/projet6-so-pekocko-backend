const express = require('express'); // Useful to create a router
const router = express.Router(); // Creates router

const userCtrl = require('../controllers/user'); // Imports User controller
const verifyPassword = require('../middleware/verify-password'); // Imports the middleware which verifies passwords
const loginRateLimiter = require('../middleware/rate-limit-configs/login-rate-limit-config'); // Imports the middleware which sets the max number login intents to 3 in 30min
const signupRateLimiter = require('../middleware/rate-limit-configs/signup-rate-limit-config'); // Imports the middleware which sets the max number of signing up to 3 in 2min

router.post('/signup', verifyPassword, signupRateLimiter, userCtrl.signup);  // Applies the verifyPassword middleware, then signupRateLimiter middleware and then the signup function from User controller to POST requests made to /signup
router.post('/login', loginRateLimiter, userCtrl.login); // Applies loginRateLimiter middleware, and then login function from User controller to POST requests made to /login

module.exports = router; // Exports User router
