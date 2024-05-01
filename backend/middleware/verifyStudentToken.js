const jwt = require('jsonwebtoken');
const Student = require('../models/studentSchema');

const verifyStudentToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.studentId = decoded._id;

        // Fetch student data using studentId
        const student = await Student.findById(decoded._id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Attach student data to the request object
        req.studentData = student;

        next();
    } catch (error) {
        console.error('Error verifying student token:', error);
        res.status(401).json({ message: 'Invalid student token' });
    }
};

module.exports = verifyStudentToken;
