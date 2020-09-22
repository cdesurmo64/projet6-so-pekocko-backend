const Sauce = require('../models/Sauce'); // Imports the data model Sauce
const fs = require('fs'); // Useful to do operations linked to the file system

// @desc Creates a new sauce
// @route POST /api/sauces
// @access Private
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce); // Extracts the JSON object of the sauce (because req.body.sauce is a string (ie not usable))
    delete sauceObject._id; // To delete the wrong _id sent by the frontend before copying the object
    const sauce = new Sauce({
        ...sauceObject, // To copy all the sauceObject elements (without the wrong _id)
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // Generates the imageURL which includes : the request protocol, the server host, /images/ and the filename
    });
    sauce.save() // Saves the sauce in the DB, and returns a promise
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
}

// @desc Sets user's opinion on the sauce (like, dislike or neutral)
// @route POST /api/sauces/:id/like
// @access Private
exports.setLikeStatus = (req, res, next) => {

}

// @desc Modifies a sauce
// @route PUT /api/sauces/:id
// @access Private
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? // Does req.file exists ?
        { // If it exists (= if a new image was uploaded)...
            ...JSON.parse(req.body.sauce), // Gets the JSON object from the sauce contained in the request body
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // Generates the URL of the new image
        } : { ...req.body }; // If it doesn't : just makes a copy of the request body
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) // Updates the sauce from the DB which _id is the same as the one in the request param, using the new sauceObject
        .then(() => res.status(200).json({ message: 'Sauce modifiée!'}))
        .catch(error => res.status(400).json({ error }));
}

// @desc Deletes a sauce
// @route DELETE /api/sauces/:id
// @access Private
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) // Finds the corresponding sauce in the DB (with the same _id as the one in the request parameters)
        .then(sauce => { // If communication with the DB succeeds : In this sauce
            const filename = sauce.imageUrl.split('/images/')[1]; // Gets the filename from the right segment of the imageUrl
            fs.unlink(`images/${filename}`, () => { // Deletes the file which path matches the first argument, and executes the callback once it's done
                Sauce.deleteOne({ _id: req.params.id }) // Deletes the sauce from the DB which id is the same as the one in the request params
                    .then(() => res.status(200).json({ message: 'Sauce supprimée ! '}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
}

// @desc Gets one sauce info
// @route GET /api/sauces/:id
// @access Private
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) // Finds the corresponding sauce in the DB (with the same _id as the one in the request parameters)
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
}

// @desc Gets all sauces info
// @route GET /api/sauces
// @access Private
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
}
