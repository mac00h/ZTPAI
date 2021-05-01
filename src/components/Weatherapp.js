import React, { useEffect, useState } from 'react'
import Conditions from './Conditions';
import '../css/searchWeather.css';
import useGeoLocation from '../scripts/useGeoLocation';


const Weatherapp = () => {
    const weatherKey = "e810cad3c7a0abf13ac6a8e80d5de218";
    const [responseObj, setResponseObj] = useState({});
    const location = useGeoLocation();
    let lt = '-44.1110';
    let ln = '-11.3221';
    
    function forecast(){
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lt}&lon=${ln}&units=metric&appid=${weatherKey}`
        fetch(url)
        .then(response => response.json())
            .then(response => {
                console.log(response);
                setResponseObj(response);
            }).catch(err => {
                console.log(err)
            })
    };

    if(location.loaded === true){
        lt = location.coordinates.lat;
        ln = location.coordinates.lng;
    }
    
    return (
       <div>
           <button onClick={forecast}>press me please</button>
           <Conditions responseObj={responseObj}/>
       </div>
    )
}

export default Weatherapp;