// middlewares/authMiddleware.js

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');  // Redirect to login page if not authenticated
}

function ensureAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.redirect('/profile');  // Redirect to profile page if not an admin
}

module.exports = { ensureAuthenticated, ensureAdmin };
