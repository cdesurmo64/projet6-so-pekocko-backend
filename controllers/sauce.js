const Sauce = require('../models/Sauce');
const fs = require('fs'); // Useful to do operations linked to the file system

// @desc Creates a new sauce
// @route POST /api/sauces
// @access Private
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id; // To delete the wrong _id sent by the frontend before copying the object
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // Generates the imageURL
    });
    sauce.save() // Saves the sauce in the DB, and returns a promise
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error: error.message }));
}

// @desc Sets user's opinion on the sauce (like, dislike or 'neutral')
// @route POST /api/sauces/:id/like
// @access Private
exports.setLikeStatus = async (req, res, next) => {
    const sentLike = req.body.like;
    const userId = req.body.userId;
    try {
        const sauce = await Sauce.findOne({ _id: req.params.id });

        switch(sentLike) {
            case 1: // If the user wants to like the sauce
                if (!sauce.usersLiked.includes(userId)) { // If the user did not already like the sauce
                    Sauce.updateOne({ _id: req.params.id },
                        {
                            $inc: { likes: 1 },
                            $push: { usersLiked: userId }
                        })
                        .then(() => res.status(200).json({ message: 'Like ajouté!' }))
                        .catch(error => res.status(400).json({ error: error.message }));
                } else { // If the user already liked the sauce
                    res.status(400).json({ message: 'Cet utilisateur a déjà mis un like à cette sauce !' });
                }
                break;
            case -1: // If the user wants to dislike the sauce
                if (!sauce.usersDisliked.includes(userId)) { // If the user did not already dislike the sauce
                    Sauce.updateOne({ _id: req.params.id },
                        {
                            $inc: { dislikes: 1 },
                            $push: { usersDisliked: userId }
                        })
                        .then(() => res.status(200).json({ message: 'Dislike ajouté !' }))
                        .catch(error => res.status(400).json({ error: error.message }));
                }
                else { // If the user already disliked the sauce
                    res.status(400).json({ message: 'Cet utilisateur a déjà mis un dislike à cette sauce !' });
                }
                break;
            case 0: // If the user wants to remove his previous like/dislike
                if (sauce.usersLiked.includes(userId)) { // If the user liked the sauce before
                    Sauce.updateOne({ _id: req.params.id },
                        {
                            $inc: { likes: -1 },
                            $pull: { usersLiked: userId }
                        })
                        .then(() => res.status(200).json({ message: 'Like supprimé !' }))
                        .catch(error => res.status(400).json({ error: error.message }));
                } else if (sauce.usersDisliked.includes(userId)) { // If the user disliked the sauce before
                    Sauce.updateOne({_id: req.params.id},
                        {
                            $inc: { dislikes: -1 },
                            $pull: { usersDisliked: userId }
                        })
                        .then(() => res.status(200).json({message: 'Dislike supprimé !'}))
                        .catch(error => res.status(400).json({ error: error.message }));
                } else {
                    res.status(400).json({ message: 'L\'opinion de l\'utilisateur sur cette sauce est introuvable !' });
                }
                break;
            default:
                res.status(400).json({ message: 'Valeur du like incorrecte !' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// @desc Modifies a specified sauce
// @route PUT /api/sauces/:id
// @access Private
exports.modifySauce = (req, res, next) => {
    let sauceObject

    if (req.file) { // If an image was sent with the request
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => { // If communication with the DB succeeds
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlinkSync(`images/${filename}`) // Deletes the old image file from the server
            })
            .catch(error => res.status(500).json({ error }));
        sauceObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // Generates the URL of the new image
        }
    } else {  // If there wasn't any file sent with the request
        sauceObject = { ...req.body }
    }

    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
        .catch(error => res.status(400).json({ error: error.message }));
}

// @desc Deletes a specified sauce
// @route DELETE /api/sauces/:id
// @access Private
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => { // If communication with the DB succeeds
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => { // Deletes the image file from the server, and executes the callback once it's done
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                    .catch(error => res.status(400).json({ error: error.message }));
            });
        })
        .catch(error => res.status(500).json({ error: error.message }));
}

// @desc Gets one specified sauce info
// @route GET /api/sauces/:id
// @access Private
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error: error.message }));
}

// @desc Gets all sauces info
// @route GET /api/sauces
// @access Private
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error: error.message }));
}
