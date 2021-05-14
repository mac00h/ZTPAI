const mongoose = require('mongoose');

const PreferencesSchema = mongoose.Schema({
    genre: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Preferences', PreferencesSchema);