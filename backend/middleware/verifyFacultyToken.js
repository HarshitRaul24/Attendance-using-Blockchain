const jwt = require('jsonwebtoken');
const Faculty = require('../models/facultySchema');

const verifyFacultyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        req.facultyId = decoded._id;

        // Fetch faculty data using facultyId
        const faculty = await Faculty.findById(decoded._id);
        if (!faculty) {
            return res.status(404).json({ message: 'Faculty member not found' });
        }

        // Attach faculty data to the request object
        req.facultyData = faculty;

        next();
    } catch (error) {
        console.error('Error verifying faculty token:', error);
        res.status(401).json({ message: 'Invalid faculty token' });
    }
};

module.exports = verifyFacultyToken;
