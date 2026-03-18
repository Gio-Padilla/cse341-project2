const { body, param, validationResult } = require('express-validator');
const mongodb = require('../data/database');

// STUDENT RULES
const studentRules = () => {
    return [
        body('studentId')
            .notEmpty()
            .withMessage('studentId is required')
            .isString()
            .withMessage('studentId must be a string')
            .custom(async (value, { req }) => {
                const db = mongodb.getDatabase().db();

                const existingStudent = await db
                    .collection('students')
                    .findOne({ studentId: value });

                // If creating OR changing studentId during update
                if (existingStudent && req.method === 'POST') {
                    throw new Error('studentId already exists');
                }

                // For PUT: allow same studentId if it's the same record
                if (
                    existingStudent &&
                    req.method === 'PUT' &&
                    existingStudent.studentId !== req.params.studentId
                ) {
                    throw new Error('studentId already exists');
                }

                return true;
            }),

        body('firstName')
            .notEmpty()
            .withMessage('First name is required'),

        body('lastName')
            .notEmpty()
            .withMessage('Last name is required'),

        body('email')
            .isEmail()
            .withMessage('Valid email is required'),

        body('age')
            .isInt({ min: 0 })
            .withMessage('Age must be a positive number'),

        body('major')
            .notEmpty()
            .withMessage('Major is required'),

        body('enrolledCourses')
            .isArray()
            .withMessage('enrolledCourses must be an array')
    ];
};

// COURSE RULES
const courseRules = () => {
    return [
        body('courseId')
            .notEmpty()
            .withMessage('courseId is required')
            .isString()
            .withMessage('courseId must be a string')
            .custom(async (value, { req }) => {
                const db = mongodb.getDatabase().db();

                const existingCourse = await db
                    .collection('courses')
                    .findOne({ courseId: value });

                if (existingCourse && req.method === 'POST') {
                    throw new Error('courseId already exists');
                }

                if (
                    existingCourse &&
                    req.method === 'PUT' &&
                    existingCourse.courseId !== req.params.courseId
                ) {
                    throw new Error('courseId already exists');
                }

                return true;
            }),

        body('courseName')
            .notEmpty()
            .withMessage('Course name is required'),

        body('instructor')
            .notEmpty()
            .withMessage('Instructor is required'),

        body('credits')
            .isInt({ min: 1 })
            .withMessage('Credits must be a positive number')
    ];
};

// CHECK FUNCTION
const checkValidation = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

const studentIdParam = () => {
    return [
        param('studentId')
            .notEmpty()
            .withMessage('studentId parameter is required')
    ];
};

const courseIdParam = () => {
    return [
        param('courseId')
            .notEmpty()
            .withMessage('courseId parameter is required')
    ];
};

module.exports = {
    studentRules,
    courseRules,
    checkValidation,
    studentIdParam,
    courseIdParam
};