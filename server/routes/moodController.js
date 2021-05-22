const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');
const User = require('../models/User');

//get all "moods"
router.get('/', async (req, res) => {
    try{
        const moods = await Mood.find();
        res.json(moods);
    }catch(err){
        res.json({message: err})
    }
});

router.get('/:id', async (req, res) => {
    try{
        const mood = await Mood.find(req.params.id);
        res.json(mood);
    }catch(err){
        res.json({message: err})
    }
})

//add a mood
router.post('/:id', async (req, res) => {
    const mood = new Mood({
        forcast: req.body.forcast,
        mood: req.body.mood,
        location: req.body.location
    });

    try{
        await mood.save();
        await User.updateOne({_id: req.params.id}, {
            $push: {
                mood: mood._id
            }
        });
        res.send({mood: mood._id})
    }catch(err) {
        res.status(400).send(err);
    }
});

module.exports = router;