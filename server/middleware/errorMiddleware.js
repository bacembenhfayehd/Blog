const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);  // Correction : req.originalUrl au lieu de orginalUrl
    res.status(404);
    next(error);
};

// Middleware to handle errors
const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    res.status(error.code || 500).json({ message: error.message || "An unknown error occurred" });
};

module.exports = { notFound, errorHandler };
