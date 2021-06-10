const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workerSchema = new Schema({
    surname: String,
    name: String,
    middle_name: String,
    login: String,
    pass: String,
    birth: Date,
    photo: String,
    status: String,
    position: String
});

module.exports = mongoose.model('Worker', workerSchema);