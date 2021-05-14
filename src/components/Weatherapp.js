import Conditions from './Conditions'
import '../css/searchWeather.css'
import useGeoLocation from '../scripts/useGeoLocation'
import { useEffect, useState } from 'react'

const Weatherapp = () => {
    const location = useGeoLocation()
    let lat 
    let lon
    let bbb = false;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const weatherKey = process.env.REACT_APP_WEATHERMAP

    if(location.loaded === true){
        lat = location.coordinates.lat
        lon = location.coordinates.lng
        bbb = true;
    }
    
    useEffect(async () => {
        console.log('useeffect ran')
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherKey}`);
        const fetchedData = await response.json();
        setData(JSON.stringify(fetchedData));
        setLoading(false);
    }, [bbb]);

    return (
       <div>
           {loading ? <div>...loading</div> : <Conditions responseObj = {JSON.parse(data)}/>}
       </div>
    )
}
export default Weatherapp