const express = require('express');
const { ObjectId } = require('mongoose').Types;
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('./../models/studentSchema');
const Faculty = require('./../models/facultySchema');
const Attendance = require('./../models/attendanceSchema');
const verifyFacultyToken = require('../middleware/verifyFacultyToken');
const verifyStudentToken = require('../middleware/verifyStudentToken');

// Register route
router.post('/student-register', async (req, res) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new student instance with hashed password
        const student = new Student({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            stuId: req.body.stuId,
            rollNo: req.body.rollNo,
            password: hashedPassword
        });

        // Save the student to the database
        const savedStudent = await student.save();

        // Generate JWT token
        const token = jwt.sign({ _id: savedStudent._id }, 'secret_key');

        res.status(201).json({ message: 'Student registered successfully', token });
    } catch (error) {
        console.error('Error registering student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login route
router.post('/student-login', async (req, res) => {
    try {
        // Find the student by email
        const student = await Student.findOne({ email: req.body.email });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Check if password is correct
        const passwordMatch = await bcrypt.compare(req.body.password, student.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: student._id }, 'secret_key');

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/faculty-signup', async (req, res) => {
    try {

        // Create a new faculty member instance
        const faculty = new Faculty({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            facId: req.body.facId,
            subject: req.body.subject,
            designation: req.body.designation,
            metamaskId: req.body.metamaskId,
        });

        // Save the faculty member to the database
        const savedFaculty = await faculty.save();

        res.status(201).json({ message: 'Faculty member registered successfully', faculty: savedFaculty });
    } catch (error) {
        console.error('Error registering faculty member:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Faculty login route
router.post('/faculty-login', async (req, res) => {
    try {
        // Find the faculty member by Metamask ID
        const faculty = await Faculty.findOne({ metamaskId: req.body.metamaskId });
        if (!faculty) {
            return res.status(404).json({ message: 'Faculty member not found' });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: faculty._id }, 'your_secret_key');

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to fetch data for the student dashboard
router.get('/student/dashboard', verifyStudentToken, async (req, res) => {
    try {
        // Use req.studentId or req.studentData to access student data
        const studentData = req.studentData;
        res.status(200).json(studentData);
    } catch (error) {
        console.error('Error fetching student dashboard data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to fetch data for the faculty dashboard
router.get('/faculty/dashboard', verifyFacultyToken, async (req, res) => {
    try {
        // Use req.facultyId or req.facultyData to access faculty data
        const facultyData = req.facultyData;
        res.status(200).json(facultyData);
    } catch (error) {
        console.error('Error fetching faculty dashboard data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to add attendance data to the database
router.post('/add-attendance', async (req, res) => {
    try {
        const { subject, date, slot, attendance } = req.body;
        // console.log(attendance)
        // Create a new attendance instance
        const newAttendance = new Attendance({
            subject,
            date,
            slot,
            attendance
        });;

        // Save the attendance data to the database
        await newAttendance.save();

        res.status(201).json({ message: 'Attendance added successfully' });
    } catch (error) {
        console.error('Error adding attendance:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/get-attendance', async (req, res) => {
    try {
        // Fetch all attendance data from the database
        const allAttendance = await Attendance.find();

        res.status(200).json(allAttendance);
    } catch (error) {
        console.error('Error fetching attendance data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// API endpoint to update attendance for a specific key
router.put('/attendance/:id', async (req, res) => {
    const { id } = req.params; // Attendance ID
    const { keyToUpdate, newValue } = req.body; // Key to update and its new value

    try {
        // Find the attendance record by its ID
        const attendance = await Attendance.findById(id);

        if (!attendance) {
            return res.status(404).json({ success: false, message: 'Attendance not found' });
        }

        // Update the attendance object
        attendance.attendance[keyToUpdate] = newValue;

        // Save the updated attendance record
        await attendance.save();

        res.status(200).json({ success: true, message: 'Attendance updated successfully' });
    } catch (error) {
        console.error('Error updating attendance:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Route to update attendance
router.put('/update-attendance/:id', async (req, res) => {
    try {
        const { subject, date, slot, attendance } = req.body;

        // Find the attendance record by ID
        const updatedAttendance = await Attendance.findByIdAndUpdate(req.params.id, {
            subject,
            date,
            slot,
            attendance
        });

        if (!updatedAttendance) {
            return res.status(404).json({ message: 'Attendance not found' });
        }

        res.status(200).json({ message: 'Attendance updated successfully' });
    } catch (error) {
        console.error('Error updating attendance:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
