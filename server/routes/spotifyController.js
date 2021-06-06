const express = require('express');
const router = express.Router();
const axios = require('axios')
require('dotenv/config');

router.post('/getToken', async (req, res) => {
    axios('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : `Basic ${Buffer.from(`${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`).toString('base64')}`
        },
        params: {
            grant_type: 'client_credentials'
        }
    }).then((respond) => {
        console.log('got the token');
        console.log(respond.data);
        res.send(respond.data);
        return respond.data;
    }).catch((error) => {
        console.log(error);
    })
})

router.get('/getArtistID/', async (req, res) => {
    axios(`https://api.spotify.com/v1/search?q=${req.query.artist}&type=artist&limit=1&offset=0`, {
        headers: {
            'Authorization' : 'Bearer ' + req.query.token,
            'Accept' : 'application/json' 
        },
        method: 'GET'
    }).then((response) => {
        console.log(response.data.artists.items[0].id)
        res.send(response.data.artists.items[0].id)
        return response.data.artists.items[0].id
    }).catch(err => {
        console.log(err)
    })
})

router.get('/getRecommendations', async (req, res) => {
    axios(`https://api.spotify.com/v1/recommendations?limit=9&market=US&seed_artists=${req.query.artistID}&seed_genres=${req.query.firstGenre}%2C%20${req.query.secondGenre}%2C%20${req.query.thirdGenre}&target_energy=${req.query.energy}&min_tempo=${req.query.minTempo}&max_tempo=${req.query.maxTempo}&target_valence=${req.query.positivity}&target_popularity=${req.query.popularity}`, {
        headers: {
            'Authorization' : 'Bearer ' + req.query.token,
        },
        method: 'GET'
    }).then((response) => {
        console.log(response.data.tracks)
        res.send(response.data)
        return response.data
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router;