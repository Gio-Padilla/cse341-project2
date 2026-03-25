const express = require('express');
// body-parser is no longer needed in modern Express
// const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

// Middleware
// Built-in JSON parser (replaces body-parser)
app.use(express.json());

// Session middleware (required for Passport persistent login sessions)
app.use(session({
    secret: process.env.SESSION_SECRET || "secret", // ⚠️ use env variable in production
    resave: false,
    saveUninitialized: false, // better practice: don't create empty sessions
}));

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

// This middleware enables cross-origin requests by adding CORS headers
// NOTE: Using both manual headers AND cors() is redundant, so we simplify it
app.use(cors({
    origin: '*', // ⚠️ In production, restrict this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

// Routes
app.use('/', require('./routes'));

// Passport GitHub Strategy (OAuth setup)
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    // Here you would normally find or create a user in your database
    // Example:
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //     return done(err, user);
    // });

    return done(null, profile); // currently just passing profile through
}));

// Serialize user into the session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Route to start GitHub authentication flow
app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

// GitHub OAuth callback route
app.get('/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/api-docs',
        // session: false ❌ removed because we ARE using sessions
    }),
    (req, res) => {
        // No need to manually store user in session
        // Passport already handles this via serializeUser
        res.redirect('/');
    }
);

// Global Error Handler (Goes after all routes)
app.use((err, req, res, next) => {
    console.error(err);

    let statusCode = err.status || 500;
    let message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        error: message
    });
});

// Start server // pnpm start
mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(PORT, () =>
            console.log(`Server running on ${HOST}:${PORT}`)
        );
    }
});