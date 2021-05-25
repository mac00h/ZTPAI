import Conditions from './Conditions'
import '../css/searchWeather.css'
import useGeoLocation from '../scripts/useGeoLocation'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const Weatherapp = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const weatherKey = process.env.REACT_APP_WEATHERMAP
    const location = useGeoLocation()
    useEffect(async () => {
        if(Cookies.get('latitude')){
                let lat = Cookies.get('latitude')
                let lon = Cookies.get('longitude')
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherKey}`);
            const fetchedData = await response.json();
            Cookies.set('weatherData', JSON.stringify(fetchedData))
            setData(JSON.stringify(fetchedData));
            setLoading(false);
        }
    }, [location, Cookies.get('latitude')]);

    return (
       <div>
           {loading ? <div>...loading</div> : <Conditions responseObj = {JSON.parse(data)}/>}
       </div>
    )
}
export default Weatherapp