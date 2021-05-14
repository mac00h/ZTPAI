const mongoose = require('mongoose');

const MoodSchema = mongoose.Schema({
    day: {
        type: Date,
        default: Date.now,
        required: true
    },
    forcast: {
        type: String,
        default: '',
        required: true
    },
    mood: {
        type: String,
        default: '',
        required: true
    },
    location: {
        type: String,
        default: '',
        required: true
    }
})

module.exports = mongoose.model('Mood', MoodSchema);