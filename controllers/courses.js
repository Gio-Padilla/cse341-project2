const mongodb = require('../data/database');

// GET ALL COURSES
const getAll = async (req, res) => {
    //#swagger.tags=['course']
    try {
        const courses = await mongodb.getDatabase().db().collection('courses').find().toArray();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// GET SINGLE COURSE (by courseId)
const getSingle = async (req, res) => {
    //#swagger.tags=['course']
    try {
        const courseId = req.params.courseId;

        const course = await mongodb.getDatabase().db().collection('courses').findOne({ courseId });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// ADD COURSE
const addCourse = async (req, res) => {
    //#swagger.tags=['course']
    try {
        const course = {
            courseId: req.body.courseId,
            courseName: req.body.courseName,
            instructor: req.body.instructor,
            credits: req.body.credits
        };

        const response = await mongodb.getDatabase().db().collection('courses').insertOne(course);

        res.status(201).json({ message: 'Course created successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'courseId already exists' });
        }
        res.status(500).json({ message: 'Server error', error });
    }
};

// EDIT COURSE (by courseId)
const editCourse = async (req, res) => {
    //#swagger.tags=['course']
    try {
        const courseId = req.params.courseId;

        const course = {
            courseId: req.body.courseId,
            courseName: req.body.courseName,
            instructor: req.body.instructor,
            credits: req.body.credits
        };

        const response = await mongodb.getDatabase().db().collection('courses').replaceOne(
            { courseId },
            course
        );

        if (response.matchedCount === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(204).send();
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'courseId already exists' });
        }
        res.status(500).json({ message: 'Server error', error });
    }
};

// DELETE COURSE (by courseId)
const deleteCourse = async (req, res) => {
    //#swagger.tags=['course']
    try {
        const courseId = req.params.courseId;

        const response = await mongodb.getDatabase().db().collection('courses').deleteOne({ courseId });

        if (response.deletedCount === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getAll,
    getSingle,
    addCourse,
    editCourse,
    deleteCourse
};