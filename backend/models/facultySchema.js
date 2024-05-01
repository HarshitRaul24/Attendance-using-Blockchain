const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema({
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
    facId: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true
    },
    metamaskId:{
        type: String,
        required: true
    }
});

const Faculty = mongoose.model("Faculty", FacultySchema);

module.exports = Faculty;