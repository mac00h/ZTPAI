import Conditions from './Conditions'
import '../css/searchWeather.css'
import useGeoLocation from '../scripts/useGeoLocation'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const Weatherapp = (props) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const weatherKey = process.env.REACT_APP_WEATHERMAP
    const location = useGeoLocation()
    
    const fetchWeather = () => {
        let lat = Cookies.get('latitude')
        let lon = Cookies.get('longitude')
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherKey}`)
        .then((response) => response.json()
            .catch(err => {
                console.log(err)
                return {};
            })).then((json) => {
                console.log(json);
                Cookies.set('weatherData', JSON.stringify(json))
                setData(JSON.stringify(json))
                props.passWeatherData(JSON.stringify(json))
                setLoading(false)
            }).catch((err) => {
                console.log('fetch failed', err)
            })
    }

    useEffect(() => {
        if(Cookies.get('latitude')) fetchWeather()
    }, [location, Cookies.get('latitude')])

    return (
       <div>
           {loading ? <div>...loading</div> : <Conditions responseObj = {JSON.parse(data)}/>}
       </div>
    )
}
export default Weatherapp