const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoodSchema = new Schema({
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
const Mood = mongoose.model('Mood', MoodSchema);
module.exports = Mood;