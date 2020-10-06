const rateLimit = require('express-rate-limit'); // Useful to limit repeated requests to public APIs and endpoints

module.exports = rateLimit({
    windowMs: 30 * 60 * 1000, // During 30 minutes
    max: 3,                   // 3 intents max
    message: 'Vous avez dépassé le nombre de tentative de connexion autorisé. Réessayez dans 30 minutes.'
});
