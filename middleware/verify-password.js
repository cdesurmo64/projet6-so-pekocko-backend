const passwordSchema = require('../models/Password'); // Imports the data model Password

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) { // If the entered password does not respect the passwordSchema...
        res.status(400).json({ message: 'Le mot de passe choisi n\'est pas assez fort ! Veuillez respecter les règles suivantes : ' + passwordSchema.validate(req.body.password, { list: true }) }); // ...sends an error response
    } else { // If the entered password respects the passwordSchema...
        next(); // ...passes the execution to the next middleware
    }
};
