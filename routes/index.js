const router = require('express').Router();

const swaggerRoutes = require('./swagger');
const studentRoutes = require('./students');
const coursesRoutes = require('./courses');

router.get('/', (req, res) => { res.send('Hello World')});

router.use(
    '/student',
    studentRoutes
);

router.use(
    '/course',
    coursesRoutes
);

router.use(
    '/api-docs',
    swaggerRoutes
);

module.exports = router;