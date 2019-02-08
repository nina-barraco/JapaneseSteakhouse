const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reservation = new Schema({
    firstName: {
        type: String,
        required: true
    }
})