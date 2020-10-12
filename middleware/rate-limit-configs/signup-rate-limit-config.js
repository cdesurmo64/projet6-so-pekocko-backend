const rateLimit = require('express-rate-limit'); // Useful to limit repeated requests to public APIs and endpoints

module.exports = rateLimit({
    windowMs: 2 * 60 * 1000, // During 2 minutes
    max: 3,                  // 3 requests max
    message: 'Vous avez dépassé le nombre d\'inscription autorisée. Réessayez dans 2 minutes.'
});
