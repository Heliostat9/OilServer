const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: String,
    master: {
        type: Schema.Types.ObjectId,
        ref: 'Worker'
    },
    workers: [{
        type: Schema.Types.ObjectId,
        ref: 'Worker'
    }]
});

module.exports = mongoose.model('Group', groupSchema);