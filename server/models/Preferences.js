const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PreferencesSchema = new Schema({
    firstGenre: {
        type: String,
        required: true
    },
    secondGenre: {
        type: String,
        required: true
    },
    thirdGenre: {
        type: String,
        required: true
    }
})

const Preferences = mongoose.model('Preferences', PreferencesSchema);

module.exports = Preferences;