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
    let button;
    let history = useHistory()
    
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

    let SpotifySeeds = ApplyVariables(userMood)
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
            <div>
                {props.isUser ? 
                <div className="cont"> 
                    <div className="weatherDiv">
                        <Weatherapp passWeatherData = {weatherData => setWeatherData(JSON.parse(weatherData))}/>
                    </div>
                    <div className="contentDiv">
                        {loadedComponent}
                    </div>
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