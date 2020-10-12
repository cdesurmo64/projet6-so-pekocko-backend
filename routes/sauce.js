const express = require('express'); // Useful to create a router
const router = express.Router(); // Creates router

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth'); // Protects routes by verifying tokens
const multer = require('../middleware/multer-config'); // Handles files sent with HTTP request to our API

// Global GET route to get all sauces info from the DB
router.get('/', auth, sauceCtrl.getAllSauces);

// Individual GET route to get info on one sauce from the DB
router.get('/:id', auth, sauceCtrl.getOneSauce);

// POST route to create a sauce & save it in the DB
router.post('/', auth, multer, sauceCtrl.createSauce);

// Individual PUT route to modify a sauce from the DB
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

// Individual DELETE route to delete a sauce from the DB
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// POST route to set the like status of a sauce (like, dislike or neutral)
router.post('/:id/like', auth, sauceCtrl.setLikeStatus);

module.exports = router; // Exports the Sauce router
