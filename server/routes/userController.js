const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');
const verifyToken = require('./verifyToken');

//get all users
router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.json({message:err})
    }
});

//register user
router.post('/', async (req, res) => {
    //validate data before adding user to database
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if email already exists in database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists in database.');

    //check if username already exists in database
    const usernameExist = await User.findOne({username: req.body.username});
    if(usernameExist) return res.status(400).send('Username already exists in database.');

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const user = new User({
        email: req.body.email,
        password: hashedPassword,
        username: req.body.username,
        age: req.body.age
    });

    try {
        await user.save();
        res.send({user: user._id});
    }catch(err) {
        res.status(400).send(err);
    }
});

//login
router.post('/login', async (req, res) => {
    //res.json({status: 'ok', data: 'fhjaasdadasdada'})
    //validate data before logging in
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if username exists in database
    const user = await User.findOne({username: req.body.username});
    if(!user) return res.status(400).send('Username does not exists in database.');

    //check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password.');

    //create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({
        status: 'ok', 
        token: token
    });
});

//check if auth
router.get('/isUserAuth', verifyToken, (req, res) => {
    try {
        res.send('verified');
    }catch(err) {
        res.status(400).send(err);
    }
});

//find user by username
router.get('/:username', async (req, res) => {
    try{
        const user = await User.find({username: req.params.username});
        res.json(user);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;