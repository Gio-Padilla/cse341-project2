const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/courses');
const { courseRules, checkValidation, courseIdParam } = require('../utilities/validator');

// GET
router.get('/', coursesController.getAll);
router.get(
    '/:courseId',
    courseIdParam(),
    checkValidation,
    coursesController.getSingle
);

// POST
router.post(
    '/',
    courseRules(),
    checkValidation,
    coursesController.addCourse
);

// PUT
router.put(
    '/:courseId',
    courseRules(),
    checkValidation,
    coursesController.editCourse
);

// DELETE
router.delete(
    '/:courseId',
    courseIdParam(),
    checkValidation,
    coursesController.deleteCourse
);

module.exports = router;