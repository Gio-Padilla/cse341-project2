const router = require('express').Router();

const studentsController = require('../controllers/students');
const { studentRules, checkValidation, studentIdParam } = require('../utilities/validator');
const utilities = require("../utilities/");

// GET ALL STUDENTS
router.get(
    '/',
    //#swagger.tags = ['student']
    //#swagger.summary = 'Get all students'
    utilities.handleErrors(studentsController.getAll)
);

// GET SINGLE STUDENT
router.get(
    '/:studentId',
    //#swagger.tags = ['student']
    //#swagger.summary = 'Get a single student by studentId'
    studentIdParam(),
    checkValidation,
    utilities.handleErrors(studentsController.getSingle)
);

// POST STUDENT
router.post(
    '/',
    /* #swagger.tags = ['student']
       #swagger.summary = 'Create a new student'
       #swagger.parameters['body'] = {
           in: 'body',
           description: 'Student object to add',
           required: true,
           schema: {
               "studentId": "S1001",
               "firstName": "John",
               "lastName": "Doe",
               "email": "john.doe@email.com",
               "age": 20,
               "major": "Computer Science",
               "enrolledCourses": ["C101", "C102"]
           }
       }
    */
    studentRules(),
    checkValidation,
    utilities.handleErrors(studentsController.addStudent)
);

// PUT STUDENT
router.put(
    '/:studentId',
    /* #swagger.tags = ['student']
       #swagger.summary = 'Update a student'
       #swagger.parameters['body'] = {
           in: 'body',
           description: 'Updated student object',
           required: true,
           schema: {
               "studentId": "S1001",
               "firstName": "John",
               "lastName": "Doe",
               "email": "john.doe@email.com",
               "age": 20,
               "major": "Computer Science",
               "enrolledCourses": ["C101", "C102"]
           }
       }
    */
    studentRules(),
    checkValidation,
    utilities.handleErrors(studentsController.editStudent)
);

// DELETE STUDENT
router.delete(
    '/:studentId',
    //#swagger.tags = ['student']
    //#swagger.summary = 'Delete a student'
    studentIdParam(),
    checkValidation,
    utilities.handleErrors(studentsController.deleteStudent)
);

module.exports = router;