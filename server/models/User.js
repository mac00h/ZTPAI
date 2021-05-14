const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const UserSchema = mongoose.Schema({
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
    }
})

module.exports = mongoose.model('Users', UserSchema);