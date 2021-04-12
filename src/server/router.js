const express = require('express');
const fetch = require('node-fetch');

let router = express.Router();
let key = "e810cad3c7a0abf13ac6a8e80d5de218";
router.get('/:locationName', (req, res) => {
    const locationName = req.params.locationName;
    console.log(locationName);

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+locationName+"&units=metric&APPID="+key;

    fetch(url)
        .then(response => { return response.json(); })
            .then(data => {
                console.log("fetched data:", data);
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.send(data);
            })
            .catch(err => {
                console.log(err);
            })
});


module.exports = router;