const rateLimit = require('express-rate-limit'); // Useful to limit repeated requests to public APIs and endpoints

module.exports = rateLimit({
    windowMs: 60 * 60 * 1000, // During 60 minutes
    max: 100,                 // 100 requests max
    message: 'Vous avez dépassé le nombre de requêtes autorisé. Réessayez dans une heure.'
});
