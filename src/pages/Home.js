import '../css/home.css';
import { useEffect, useState } from 'react';
import Weatherapp from '../components/Weatherapp';
import UserPreferences from '../components/UserPreferences'
import HowAreYou from '../components/HowAreYou'
import Recommendations from '../components/Recommendations';
import UserInputs from '../components/UserInputs';
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import ApplyVariables from '../scripts/ApplyVariables';

const Home = (props) => {
    let loadedComponent;
    let button, token;
    let history = useHistory()
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };
    if(Cookies.get('isAuth')){
        token = parseJwt(Cookies.get('token'))
    }
    const [load, setLoad] = useState(0)
    const [weatherData, setWeatherData] = useState()
    const [userMood, setUserMood] = useState('null');
    const [userInputs, setUserInputs] = useState({
        userArtist: 'null',
        userPopularity: 'null'
    })

    const [userGenres, setUserGenres] = useState({
        firstGenre: 'null',
        secondGenre: 'null',
        thirdGenre: 'null'
    })

    const addUserMood = async (mood, weadata) => {
        const resp = await fetch(`http://localhost:4000/mood/${token._id}`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                forcast: weadata.weather[0].description,
                mood: mood,
                location: weadata.name
            })
        })

        const data = await resp.json()
        console.log("moodTableUpdated: ", data)
        return data
    }

    let SpotifySeeds = ApplyVariables(userMood)
    useEffect(() => {
        if(userMood !== 'null'){
            addUserMood(userMood, weatherData)
        }
    }, [userMood])
    switch(load){
        case(0):
            loadedComponent = <HowAreYou passMood = {mood => setUserMood(mood)}/>
            if(userMood !== 'null'){
                console.log('mood loaded', userMood)
                setLoad(load+1)
            }
        break;

        case(1):
            loadedComponent = <UserInputs passInputs = {inputs => setUserInputs({
                userArtist: inputs.artist,
                userPopularity: inputs.popularity
            })}/>
            if(userInputs.userArtist !== 'null'){
                console.log(userInputs)
                setLoad(load+1)
            }
        break;

        case(2):
            loadedComponent = <UserPreferences passGenres = {user => setUserGenres({
                firstGenre: user.first,
                secondGenre: user.second,
                thirdGenre: user.third
            })}/>
            if(userGenres.thirdGenre !== 'null'){
                setLoad(load+1)
                console.log('genres loaded')
            }
        break;

        case(3):
            loadedComponent = <Recommendations genres = {userGenres} seeds = {SpotifySeeds} userinp = {userInputs}/>
            button = null
        break;
    }

    return (
        <div className="home">
            {props.isUser ? 
            <div className="content">
                <div className="weatherDiv">
                    <Weatherapp passWeatherData = {weatherData => setWeatherData(JSON.parse(weatherData))}/>
                </div>
                <div className="contentDiv">
                    {loadedComponent}
                </div>
            </div> : 
            <div className="notLoggedIn">
                <div className="cnt">
                <h1>You must be logged in to see this page.</h1>
                <button onClick={() => history.push('/')}>I want to login!</button>
                </div>    
            </div>}
        </div>
    );
}
 
export default Home;