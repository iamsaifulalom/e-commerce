const { rateLimit } = require("express-rate-limit")

const expressLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 300, // Limit each IP to 300 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    handler: (_, res) => {
        res.status(429).json({
            success: false,
            message: 'Too many requests. Please try again after 15 minutes.',
        });
    },
})

module.exports = { expressLimiter }