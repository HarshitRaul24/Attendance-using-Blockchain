const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    stuId: {
        type: String,
        required: true
    },
    rollNo: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;