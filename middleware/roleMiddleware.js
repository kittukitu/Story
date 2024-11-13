// middlewares/roleMiddleware.js
function restrictToRole(role) {
    return (req, res, next) => {
        if (req.session.user && req.session.user.role === role) {
            next(); // User has the correct role, proceed
        } else {
            res.status(403).send('Access denied.');
        }
    };
}

module.exports = restrictToRole;
