const mongoose = require('mongoose'); // Useful to create and manipulate data schemas
const uniqueValidator = require('mongoose-unique-validator'); // Useful for pre-validating users' info before saving them

// Creates the User data schema, including all the info the User objects will need
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez saisir une adresse email valide !']}, // To make sure 2 users can't have the same email address, and that the email entered has the right syntax
    password: { type: String, required: true}
});

userSchema.plugin(uniqueValidator); // Defines uniqueValidator as a plugin for the User schema

module.exports = mongoose.model('User', userSchema); // Exports the schema as a model called "User" to make it accessible to other files

