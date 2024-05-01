const mongoose = require('mongoose');

const DB = "mongodb+srv://harshitraul15:root@cluster0.r60oriz.mongodb.net/BAttendance?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(DB).then(()=>console.log('MongoDB Connected...')).catch((err)=> console.log(err.message));