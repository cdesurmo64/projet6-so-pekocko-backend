const rateLimit = require('express-rate-limit'); // Useful to limit repeated requests to public APIs and endpoints

module.exports = rateLimit({
    windowMs: 60 * 60 * 1000, // During 60 minutes
    max: 3,                   // 3 intents max
    message: 'Vous avez dépassé le nombre de tentative de connexion autorisé. Réessayez dans une heure.'
});
