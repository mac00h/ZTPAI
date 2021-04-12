import React, { useState } from 'react'
import Conditions from './Conditions';

const Weatherapp = () => {
    let [responseObj, setResponseObj] = useState({});
    let [city, setCity] = useState('');
    const uriEncodedCity = encodeURIComponent(city);
    function getForecast(e){
        e.preventDefault();
        let url = `http://localhost:5000/forcast/${uriEncodedCity}/`
        fetch(url)
        .then(res=> res.json())
            .then(res => {
                setResponseObj(res);
            }).catch(err =>{
            console.log(err)
        });
    }

    return (
       <div>
           <h2>Find Current Weather Conditions</h2>
           <form onSubmit={getForecast}>
                <input
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
           
           <button type="submit">Get Forecast</button>
           </form>
           <Conditions responseObj={responseObj}/>
       </div>
    )
}

export default Weatherapp;