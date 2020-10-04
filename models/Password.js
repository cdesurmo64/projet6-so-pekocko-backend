const passwordValidator = require('password-validator'); // Useful to create a complex schema for passwords

const passwordSchema = new passwordValidator(); // Creates a schema

// Adds properties to it to define a strong password schema
passwordSchema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                                   // Must have at least one uppercase letter
    .has().lowercase()                                   // Must have at least one lowercase letter
    .has().digits()                                      // Must have at least one digit
    .has().not().spaces()                                // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

module.exports = passwordSchema; // Exports the passwordSchema to make it accessible to other files
