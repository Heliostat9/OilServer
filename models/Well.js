const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wellSchema = new Schema({
    status: String,
    type_well: String,
    name: String,
    location: String,
    photo: String
});

module.exports = mongoose.model('Well', wellSchema);