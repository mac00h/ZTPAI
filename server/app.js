const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

//middlewares
app.use(express.json())
app.use(cors())

const usersRouter = require('./routes/users');
app.use('/users', usersRouter)

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
