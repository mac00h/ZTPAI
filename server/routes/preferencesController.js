const express = require('express');
const Preferences = require('../models/Preferences');
const router = express.Router();
const User = require('../models/User');

//get all user preferences
router.get('/', async (req, res) => {
    try{
        const preferences = await Preferences.find();
        res.json(preferences);
    }catch(err){
        res.json({message: err})
    }
});

router.get('/:id', async (req, res) => {
    try{
        const preferences = await Preferences.findById(req.params.id);
        res.json(preferences);
    }catch(err){
        res.json({message: err})
    }
});

//add user preferences
router.post('/:id', async (req, res) => {
    const pref = new Preferences({
        firstGenre: req.body.firstGenre,
        secondGenre: req.body.secondGenre,
        thirdGenre: req.body.thirdGenre
    });

    try{
        await pref.save();
        await User.updateOne({_id: req.params.id}, {
            $push: {
                preferences: pref._id
            }
        });
        res.send({pref: pref._id});
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;