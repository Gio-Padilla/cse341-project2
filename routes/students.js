// This is the Routes file
const router = require('express').Router();

const studentsController = require('../controllers/students');
const { studentRules, checkValidation, studentIdParam } = require('../utilities/validator');
const utilities = require("../utilities/");

// GET ALL
router.get(
    '/',
    //#swagger.tags = ['student']
    //#swagger.summary = 'Get all students'
    utilities.handleErrors(studentsController.getAll)
);

// GET SINGLE
router.get(
    '/:studentId',
    //#swagger.tags = ['student']
    //#swagger.summary = 'Get a single student by studentId'
    studentIdParam(),
    checkValidation,
    utilities.handleErrors(studentsController.getSingle)
);

// POST
router.post(
    '/',
    //#swagger.tags = ['student']
    //#swagger.summary = 'Create a new student'
    studentRules(),
    checkValidation,
    utilities.handleErrors(studentsController.addStudent)
);

// PUT
router.put(
    '/:studentId',
    //#swagger.tags = ['student']
    //#swagger.summary = 'Update a student'
    studentRules(),
    checkValidation,
    utilities.handleErrors(studentsController.editStudent)
);

// DELETE
router.delete(
    '/:studentId',
    //#swagger.tags = ['student']
    //#swagger.summary = 'Delete a student'
    studentIdParam(),
    checkValidation,
    utilities.handleErrors(studentsController.deleteStudent)
);

module.exports = router;