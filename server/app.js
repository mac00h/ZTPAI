const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

//middlewares
app.use(express.json())
app.use(cors())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const spotifyRouter = require('./routes/spotifyController');
app.use('/spotify', spotifyRouter);

//userRouter
const usersRouter = require('./routes/userController');
app.use('/users', usersRouter);

//moodRouter
const moodRouter = require('./routes/moodController');
app.use('/mood', moodRouter);

//preferencesRouter
const preferencesRouter = require('./routes/preferencesController');
app.use('/pref', preferencesRouter);

//ROUTES
app.get('/', (req, res) => {
    res.send('home');
})

//db connection
mongoose.connect(process.env.MONGO_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('connected to database');
})

//listening
app.listen(4000);
