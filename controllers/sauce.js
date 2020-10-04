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

// @desc Sets user's opinion on the sauce (like, dislike or 'neutral')
// @route POST /api/sauces/:id/like
// @access Private
exports.setLikeStatus = async (req, res, next) => {
    const sentLike = req.body.like;
    const userId = req.body.userId;
    try {
        const sauce = await Sauce.findOne({_id: req.params.id}) // Gets the sauce which id is the one in the request params

        switch(sentLike) {
            case 1: // If the user wants to like the sauce
                if (!sauce.usersLiked.includes(userId)) { // If the user did not already like the sauce
                    Sauce.updateOne({_id: req.params.id}, // Updates the sauce from the DB which _id is the same as the one in the request param
                        {
                            $inc: { likes: 1}, // Adds 1 to the number of likes
                            $push: { usersLiked: userId } // Adds the userId to the array containing the users who liked this sauce
                        })
                        .then(() => res.status(200).json({ message: 'Like ajouté!' }))
                        .catch(error => res.status(400).json({ error }));
                } else { // If the user already liked the sauce
                    res.status(200).json({ message: 'Cet utilisateur a déjà mis un like à cette sauce !' });
                }
                break;
            case -1: // If the user wants to dislike the sauce
                if (!sauce.usersDisliked.includes(userId)) { // If the user did not already dislike the sauce
                    Sauce.updateOne({_id: req.params.id}, // Updates the sauce from the DB which _id is the same as the one in the request param
                        {
                            $inc: { dislikes: 1}, // Adds 1 to the number of dislikes
                            $push: { usersDisliked: userId } // Adds the userId to the array containing the users who disliked this sauce
                        })
                        .then(() => res.status(200).json({ message: 'Dislike ajouté!' }))
                        .catch(error => res.status(400).json({ error }));
                }
                else { // If the user already disliked the sauce
                    res.status(200).json({ message: 'Cet utilisateur a déjà mis un dislike à cette sauce !' });
                }
                break;
            case 0: // If the user wants to remove his previous like/dislike
                if (sauce.usersLiked.includes(userId)) { // If the user liked the sauce before
                    Sauce.updateOne({_id: req.params.id}, // Updates the sauce from the DB which _id is the same as the one in the request param
                        {
                            $inc: { likes: -1 }, // Removes 1 from the number of likes
                            $pull: { usersLiked: userId } // Removes the userId from the array containing the users who liked this sauce
                        })
                        .then(() => res.status(200).json({ message: 'Like supprimé!' }))
                        .catch(error => res.status(400).json({ error }));
                } else if (sauce.usersDisliked.includes(userId)) { // If the user disliked the sauce before
                    Sauce.updateOne({_id: req.params.id}, // Updates the sauce from the DB which _id is the same as the one in the request param
                        {
                            $inc: { dislikes: -1 }, // Removes 1 from the number of dislikes
                            $pull: { usersDisliked: userId } // Removes the userId from the array containing the users who disliked this sauce
                        })
                        .then(() => res.status(200).json({message: 'Dislike supprimé!'}))
                        .catch(error => res.status(400).json({ error }));
                } else {
                    console.log('L\'opinion de l\'utilisateur sur cette sauce est introuvable')
                }
                break;
            default:
                console.log('Valeur du like incorrecte');
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

// @desc Modifies a sauce
// @route PUT /api/sauces/:id
// @access Private
exports.modifySauce = (req, res, next) => {
    let sauceObject

    if (req.file) { // If the req.file exists ( = if an image was sent with the put request)
        Sauce.findOne({ _id: req.params.id }) // Finds the corresponding sauce in the DB (with the same _id as the one in the request parameters)
            .then(sauce => { // If communication with the DB succeeds : In this sauce...
                const filename = sauce.imageUrl.split('/images/')[1]; // ...gets the filename from the right segment of the imageUrl
                fs.unlinkSync(`images/${filename}`) // Deletes the file which path matches the first argument
            })
            .catch(error => res.status(500).json({ error }));
        sauceObject = { // In the sauceObject variable ...
            ...JSON.parse(req.body.sauce), // ...puts the JSON object from the sauce contained in the request body
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // and generates the URL of the new image
        }
    } else {  // If the req.file doesn't exist
        sauceObject = {...req.body} // just makes a copy of the request body in sauceObject
    }

    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) // Updates the sauce from the DB which _id is the same as the one in the request param, using the new sauceObject
        .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
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
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
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
