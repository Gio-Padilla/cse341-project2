// This is the Routes file
const router = require('express').Router();
// const { get } = require('.');
const studentsController = require('../controllers/students');
const { studentRules, checkValidation, studentIdParam } = require('../utilities/validator');

// GET
router.get('/', studentsController.getAll);
router.get(
    '/:studentId',
    studentIdParam(),
    checkValidation,
    studentsController.getSingle
);

// POST
router.post(
    '/',
    studentRules(),
    checkValidation,
    studentsController.addStudent
);

// PUT
router.put(
    '/:studentId',
    studentRules(),
    checkValidation,
    studentsController.editStudent
);

// DELETE
router.delete(
    '/:studentId',
    studentIdParam(),
    checkValidation,
    studentsController.deleteStudent
);

module.exports = router;
