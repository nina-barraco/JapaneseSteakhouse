const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reservation = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    size: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Reservation', Reservation);