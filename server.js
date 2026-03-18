const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database')
const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

// Middleware
app.use(bodyParser.json());
// This middleware enables cross-origin requests by adding CORS headers to every response,
// allowing the API to be accessed from other domains.
app.use((req, res, next) => {
    // It removes the browser’s default restriction that
    // would otherwise block requests coming from a different website.
    res.setHeader('Access-Control-Allow-Origin', '*'); // who can access (* = anyone)
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Routes
app.use('/', require('./routes'));

// Start server // pnpm start
mongodb.initDb((err) => {
    if(err) {
        console.log(err)
    }
    else {
        app.listen(PORT, () => console.log(`Database is listening and server running on ${HOST}:${PORT}`));
    }
})

