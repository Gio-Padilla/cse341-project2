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
    //#swagger.tags = ['course']
    //#swagger.summary = 'Create a new course'
    courseRules(),
    checkValidation,
    utilities.handleErrors(coursesController.addCourse)
);

// PUT COURSE
router.put(
    '/:courseId',
    //#swagger.tags = ['course']
    //#swagger.summary = 'Update a course'
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