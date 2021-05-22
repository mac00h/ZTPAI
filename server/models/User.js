const mongoose = require('mongoose');
const Mood = require('./Mood');
const Schema = mongoose.Schema;
const Preferences = require('./Preferences');
mongoose.set('useCreateIndex', true);

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    preferences: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Preferences
        }
    ],
    mood: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Mood
        }
    ]
})

const User = mongoose.model('Users', UserSchema);
module.exports = User;