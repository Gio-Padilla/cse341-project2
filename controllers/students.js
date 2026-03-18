const mongodb = require('../data/database');

// GET ALL STUDENTS
const getAll = async (req, res) => {
    //#swagger.tags=['student']
    try {
        const students = await mongodb.getDatabase().db().collection('students').find().toArray();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// GET SINGLE STUDENT (by studentId)
const getSingle = async (req, res) => {
    //#swagger.tags=['student']
    try {
        const studentId = req.params.studentId;

        const student = await mongodb.getDatabase().db().collection('students').findOne({ studentId });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// ADD STUDENT
const addStudent = async (req, res) => {
    //#swagger.tags=['student']
    try {
        const student = {
            studentId: req.body.studentId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            age: req.body.age,
            major: req.body.major,
            enrolledCourses: req.body.enrolledCourses
        };

        const response = await mongodb.getDatabase().db().collection('students').insertOne(student);

        res.status(201).json({ message: 'Student created successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'studentId already exists' });
        }
        res.status(500).json({ message: 'Server error', error });
    }
};

// EDIT STUDENT (by studentId)
const editStudent = async (req, res) => {
    //#swagger.tags=['student']
    try {
        const studentId = req.params.studentId;

        const student = {
            studentId: req.body.studentId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            age: req.body.age,
            major: req.body.major,
            enrolledCourses: req.body.enrolledCourses
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('students')
            .replaceOne({ studentId }, student);

        if (response.matchedCount === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(204).send();
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'studentId already exists' });
        }
        res.status(500).json({ message: 'Server error', error });
    }
};

// DELETE STUDENT (by studentId)
const deleteStudent = async (req, res) => {
    //#swagger.tags=['student']
    try {
        const studentId = req.params.studentId;

        const response = await mongodb.getDatabase().db().collection('students').deleteOne({ studentId });

        if (response.deletedCount === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getAll,
    getSingle,
    addStudent,
    editStudent,
    deleteStudent
};