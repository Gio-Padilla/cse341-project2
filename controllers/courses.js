const mongodb = require('../data/database');

// GET ALL COURSES
const getAll = async (req, res) => {
    const courses = await mongodb
        .getDatabase()
        .db()
        .collection('courses')
        .find()
        .toArray();

    res.status(200).json(courses);
};

// GET SINGLE COURSE
const getSingle = async (req, res) => {
    const courseId = req.params.courseId;

    const course = await mongodb
        .getDatabase()
        .db()
        .collection('courses')
        .findOne({ courseId });

    if (!course) {
        const error = new Error('Course not found');
        error.status = 404;
        throw error;
    }

    res.status(200).json(course);
};

// ADD COURSE
const addCourse = async (req, res) => {
    const course = {
        courseId: req.body.courseId,
        courseName: req.body.courseName,
        instructor: req.body.instructor,
        credits: req.body.credits
    };

    try {
        await mongodb.getDatabase().db().collection('courses').insertOne(course);
        res.status(201).json({ message: 'Course created successfully' });
    } catch (error) {
        if (error.code === 11000) {
            const err = new Error('courseId already exists');
            err.status = 400;
            throw err;
        }
        throw error;
    }
};

// EDIT COURSE
const editCourse = async (req, res) => {
    const courseId = req.params.courseId;

    const course = {
        courseId: req.body.courseId,
        courseName: req.body.courseName,
        instructor: req.body.instructor,
        credits: req.body.credits
    };

    const response = await mongodb
        .getDatabase()
        .db()
        .collection('courses')
        .replaceOne({ courseId }, course);

    if (response.matchedCount === 0) {
        const error = new Error('Course not found');
        error.status = 404;
        throw error;
    }

    res.status(204).send();
};

// DELETE COURSE
const deleteCourse = async (req, res) => {
    const courseId = req.params.courseId;

    const response = await mongodb
        .getDatabase()
        .db()
        .collection('courses')
        .deleteOne({ courseId });

    if (response.deletedCount === 0) {
        const error = new Error('Course not found');
        error.status = 404;
        throw error;
    }

    res.status(204).send();
};

module.exports = {
    getAll,
    getSingle,
    addCourse,
    editCourse,
    deleteCourse
};