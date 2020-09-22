const express = require('express'); // Useful to create a router
const router = express.Router(); // Creates router

const userCtrl = require('../controllers/user'); // Imports User controller

router.post('/signup', userCtrl.signup);  // Applies signup function from User controller to POST requests made to /signup
router.post('/login', userCtrl.login); // Applies login function from User controller to POST requests made to /login

module.exports = router; // Exports User router
