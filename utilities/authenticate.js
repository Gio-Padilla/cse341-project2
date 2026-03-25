const isAuthenticated = (req, res, next) => {
    // Passport adds this method to check if a user is authenticated
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }

    // If not authenticated, deny access
    return res.status(401).json("You do not have access.");
};

module.exports = {
    isAuthenticated
};