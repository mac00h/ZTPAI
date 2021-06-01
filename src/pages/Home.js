import '../css/home.css';
import { useEffect, useState } from 'react';
import Weatherapp from '../components/Weatherapp';
import UserPreferences from '../components/UserPreferences'
import HowAreYou from '../components/HowAreYou'
import Recommendations from '../components/Recommendations';
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import ApplyVariables from '../scripts/ApplyVariables';

const Home = (props) => {
    let loadedComponent;
    let button;
    let history = useHistory()
    
    const [load, setLoad] = useState(0)
    const [weatherData, setWeatherData] = useState()
    const [userMood, setUserMood] = useState('null');
    const [userGenres, setUserGenres] = useState({
        firstGenre: 'null',
        secondGenre: 'null',
        thirdGenre: 'null',
        userArtists: 'null'
    })

    if(load === 0){
        loadedComponent = <HowAreYou passMood = {mood => setUserMood(mood)}/>
        if(userMood !== 'null'){
            setLoad(load+1)
            console.log('mood loaded', userMood)
        }
    }

    let SpotifySeeds = ApplyVariables(userMood)

    if(load === 1){
        loadedComponent = <UserPreferences passGenres = {user => setUserGenres({
            firstGenre: user.first,
            secondGenre: user.second,
            thirdGenre: user.third,
            userArtists: user.artist

        })}/>
        if(userGenres.thirdGenre !== 'null'){
            setLoad(load+1)
            console.log('genres loaded')
        }
    }

    if(load === 2){
        loadedComponent = <Recommendations genres = {userGenres} seeds = {SpotifySeeds}/>
        button = null
    }

    

    return (
        <div className="home">
            <div>
                {props.isUser ? 
                <div className="cont"> 
                    <Weatherapp passWeatherData = {weatherData => setWeatherData(JSON.parse(weatherData))}/>
                    {loadedComponent}
                </div> : 
                <div className="cnt">
                    <h1>You must be logged in to see this page.</h1>
                    <button onClick={() => history.push('/')}>I want to login!</button>
                </div>}
            </div>
        </div>
    );
}
 
export default Home;