const express = require('express'); // Useful to create a router
const router = express.Router(); // Creates router

// POST route to create a sauce & save it in the DB
router.post('/', SauceCtrl.createSauce);

// POST route to set the like status of a sauce (like, dislike or neutral)
router.post('/:id/like', SauceCtrl.setLikeStatus);

// Individual GET route to get info on one sauce from the DB
router.get('/:id', SauceCtrl.getOneSauce);

// Individual PUT route to modify a sauce in the DB
router.put('/:id', SauceCtrl.modifySauce);

// Individual DELETE route to delete a sauce from the DB
router.delete('/:id', SauceCtrl.deleteSauce);

// Global GET route to get all sauces info from the DB
router.get('/', SauceCtrl.getAllSauces);

module.exports = router; // Exports the Sauce router
