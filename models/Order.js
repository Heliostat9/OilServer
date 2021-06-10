const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service'
    },
    well: {
        type: Schema.Types.ObjectId,
        ref: 'Well'
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    status: String,
    start: Date,
    end: Date
});

module.exports = mongoose.model('Order', orderSchema);