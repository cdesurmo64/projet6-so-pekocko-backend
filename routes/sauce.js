const express = require('express'); // Useful to create a router
const router = express.Router(); // Creates router

const sauceCtrl = require('../controllers/sauce') // Imports Sauce controller
const multer = require('../middleware/multer-config') // Imports the multer middleware (useful to handle files sent with HTTP request to our API)

// POST route to create a sauce & save it in the DB
router.post('/', multer, sauceCtrl.createSauce);

// POST route to set the like status of a sauce (like, dislike or neutral)
router.post('/:id/like', sauceCtrl.setLikeStatus);

// Individual GET route to get info on one sauce from the DB
router.get('/:id', sauceCtrl.getOneSauce);

// Individual PUT route to modify a sauce in the DB
router.put('/:id', multer, sauceCtrl.modifySauce);

// Individual DELETE route to delete a sauce from the DB
router.delete('/:id', sauceCtrl.deleteSauce);

// Global GET route to get all sauces info from the DB
router.get('/', sauceCtrl.getAllSauces);

module.exports = router; // Exports the Sauce router
