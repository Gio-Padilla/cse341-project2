const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/courses');
const { courseRules, checkValidation, courseIdParam } = require('../utilities/validator');
const utilities = require("../utilities/");

// GET ALL COURSES
router.get(
    '/',
    //#swagger.tags = ['course']
    //#swagger.summary = 'Get all courses'
    utilities.handleErrors(coursesController.getAll)
);

// GET SINGLE COURSE
router.get(
    '/:courseId',
    //#swagger.tags = ['course']
    //#swagger.summary = 'Get a single course by courseId'
    courseIdParam(),
    checkValidation,
    utilities.handleErrors(coursesController.getSingle)
);

// POST COURSE
router.post(
    '/',
    /* #swagger.tags = ['course']
       #swagger.summary = 'Create a new course'
       #swagger.parameters['body'] = {
           in: 'body',
           description: 'Course object to add',
           required: true,
           schema: {
               "courseId": "C101",
               "courseName": "Database Fundamentals",
               "instructor": "Dr. Smith",
               "credits": 3
           }
       }
    */
    courseRules(),
    checkValidation,
    utilities.handleErrors(coursesController.addCourse)
);

// PUT COURSE
router.put(
    '/:courseId',
    /* #swagger.tags = ['course']
       #swagger.summary = 'Update a course'
       #swagger.parameters['body'] = {
           in: 'body',
           description: 'Updated course object',
           required: true,
           schema: {
               "courseId": "C102",
               "courseName": "Introduction to Programming",
               "instructor": "Prof. Johnson",
               "credits": 4
           }
       }
    */
    courseRules(),
    checkValidation,
    utilities.handleErrors(coursesController.editCourse)
);

// DELETE COURSE
router.delete(
    '/:courseId',
    //#swagger.tags = ['course']
    //#swagger.summary = 'Delete a course'
    courseIdParam(),
    checkValidation,
    utilities.handleErrors(coursesController.deleteCourse)
);

module.exports = router;