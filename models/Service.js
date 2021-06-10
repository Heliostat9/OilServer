const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    name: String,
    price: Number
});

module.exports = mongoose.model('Service', serviceSchema);