const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    place: {
        type: mongoose.Schema.ObjectId,
        ref: 'Place',
        required: true
    }
})