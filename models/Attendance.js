const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    date: Date,
    worker: {
        type: Schema.Types.ObjectId,
        ref: 'Worker'
    },
    time_start: Date,
    time_end: Date
});

module.exports = mongoose.model('Attendance', attendanceSchema);