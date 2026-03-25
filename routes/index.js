const router = require('express').Router();

const swaggerRoutes = require('./swagger');
const studentRoutes = require('./students');
const coursesRoutes = require('./courses');
const passport = require('passport');

// Root route (shows login status)
// NOTE: Passport automatically attaches user to req.user
router.get('/', (req, res) => {
    const name = req.user?.displayName || req.user?.username || 'User';
    res.send(req.user ? `Logged in as ${name}` : "Logged Out");
});

// Mount feature routes
router.use('/students', studentRoutes);
router.use('/courses', coursesRoutes);
router.use('/api-docs', swaggerRoutes);

// Route to start GitHub OAuth login
router.get('/login', passport.authenticate('github'), (req, res) => {});

// Logout route
router.get('/logout', function(req, res, next)  {
    req.logout(function(err) {
        if (err) { return next(err); }

        req.session.destroy(() => {
            res.redirect('/');
        });
    });
});

module.exports = router;