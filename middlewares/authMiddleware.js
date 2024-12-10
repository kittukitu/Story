// ensureAuthenticated.js
exports.ensureAuthenticated = (req, res, next) => {
  if (!req.session.user) {
      return res.redirect('/login');  // Redirect to login page if user is not authenticated
  }
  next();  // Proceed to the next middleware or route
};

// isAdminMiddleware.js
exports.isAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
      return res.status(403).send('Access denied. You are not an admin.'); // Return 403 if not admin
  }
  next();  // Proceed to the next middleware or route if user is an admin
};
