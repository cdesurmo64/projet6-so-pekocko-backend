const express = require('express'); // Useful to create a router
const router = express.Router(); // Creates router

const userCtrl = require('../controllers/user'); // Imports User controller
const verifyPassword = require('../middleware/verify-password'); // Imports the middleware which verifies passwords

router.post('/signup', verifyPassword, userCtrl.signup);  // Applies the verifyPassword middleware, and then the signup function from User controller to POST requests made to /signup
router.post('/login', userCtrl.login); // Applies login function from User controller to POST requests made to /login

module.exports = router; // Exports User router
