const mongodb = require('../data/database');

// GET ALL STUDENTS
const getAll = async (req, res) => {
    const students = await mongodb
        .getDatabase()
        .db()
        .collection('students')
        .find()
        .toArray();

    res.status(200).json(students);
};

// GET SINGLE STUDENT
const getSingle = async (req, res) => {
    const studentId = req.params.studentId;

    const student = await mongodb
        .getDatabase()
        .db()
        .collection('students')
        .findOne({ studentId });

    if (!student) {
        const error = new Error('Student not found');
        error.status = 404;
        throw error;
    }

    res.status(200).json(student);
};

// ADD STUDENT
const addStudent = async (req, res) => {
    const student = {
        studentId: req.body.studentId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        major: req.body.major,
        enrolledCourses: req.body.enrolledCourses
    };

    try {
        await mongodb
            .getDatabase()
            .db()
            .collection('students')
            .insertOne(student);

        res.status(201).json({ message: 'Student created successfully' });
    } catch (error) {
        if (error.code === 11000) {
            const err = new Error('studentId already exists');
            err.status = 400;
            throw err;
        }
        throw error;
    }
};

// EDIT STUDENT
const editStudent = async (req, res) => {
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
        const error = new Error('Student not found');
        error.status = 404;
        throw error;
    }

    res.status(204).send();
};

// DELETE STUDENT
const deleteStudent = async (req, res) => {
    const studentId = req.params.studentId;

    const response = await mongodb
        .getDatabase()
        .db()
        .collection('students')
        .deleteOne({ studentId });

    if (response.deletedCount === 0) {
        const error = new Error('Student not found');
        error.status = 404;
        throw error;
    }

    res.status(204).send();
};

module.exports = {
    getAll,
    getSingle,
    addStudent,
    editStudent,
    deleteStudent
};