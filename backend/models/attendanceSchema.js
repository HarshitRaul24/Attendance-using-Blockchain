const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    slot: {
        type: Number,
        required: true
    },
    attendance: {
        type: Object,
        required: true
    },
    isAdded: {
        type: Boolean,
        default: false
    }
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);

module.exports = Attendance;