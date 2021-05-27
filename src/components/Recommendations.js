import { useEffect, useState } from 'react'
import axios from 'axios'
import Songs from './Songs'
import Cookies from 'js-cookie'
import { mainModule } from 'process'

const Recommendations = (props) => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const [token, setToken] = useState('null')
    const [handledData, setHandledData] = useState({})
    const [genres, setGenres] = useState({})
    const [artistID, setArtistID] = useState()
    const [loaded, setLoaded] = useState(false)    
    
    const getToken = () => {
        axios('https://accounts.spotify.com/api/token', {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + btoa(process.env.REACT_APP_SPOTIFY_ID + ':' + process.env.REACT_APP_SPOTIFY_SECRET)
            },
            data: 'grant_type=client_credentials',
            method: 'POST'
        }).then((response) => {
            setToken(response.data.access_token)
            Cookies.set('spotifyToken', response.data.access_token)
        }).catch(err => {
            console.log(err)
        })
    }

    const getArtistID = (artist) => {
        if(token !== 'null'){
            axios(`https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1&offset=0`, {
            headers: {
                'Authorization' : 'Bearer ' + token,
                'Accept' : 'application/json' 
            },
            method: 'GET'
        }).then((response) => {
            console.log(response.data.artists.items[0].id)
            setArtistID(response.data.artists.items[0].id)
            Cookies.set('artistID', response.data.artists.items[0].id)
        }).catch(err => {
            console.log(err)
        })
        }else{
            console.log('token is not ready')
        }
    }

    useEffect(() => {
        getToken()
    }, [])
    
    const getRecommendations = (genres, id) => {
        if(token !== 'null'){
            axios(`https://api.spotify.com/v1/recommendations?limit=12&market=US&seed_artists=${id}&seed_genres=${genres.firstGenre}%2C%20${genres.secondGenre}%2C%20${genres.thirdGenre}`, {
            headers: {
                'Authorization' : 'Bearer ' + token
            },
            method: 'GET'
        }).then((response) => {
            console.log(response.data.tracks)
            setGenres(response.data)
            setLoaded(true)
        }).catch(err => {
            console.log(err)
        })
        }else{
            console.log('token is not ready')
        }
    }

    useEffect(() => {
        if(Cookies.get('spotifyToken')){
            //setVariables(props.mood, props.weather)
            getArtistID(props.genres.userArtists)
        } 
    }, [token])

    useEffect(() => {
        if(Cookies.get('artistID')){
            getRecommendations(props.genres, artistID)
        }
    }, [artistID])
    return (
        <div >
            {loaded ? <Songs responseObj = {genres}/> : <h2>Loading recommendations..</h2>}
            <div className="reco">
            <button className="fetchSongs" onClick={getRecommendations}>Refresh songs</button>
            </div>
        </div>
    );
}
 
export default Recommendations;

// const setVariables = (mood, weather) => {
//     // weather.main.temp
//     // weather.weather.[0].main
//     // weather.weather.[0].main
//     // weather.wind.speed
//     console.log(weather.main.temp)
//     console.log(weather.weather[0].main)
//     console.log(weather.weather[0].description)
//     switch(weather.weather[0].main){
//         case ('Clear'): 
//         console.log('clear')
//         break;

//         case('Clouds'):
//             switch(weather.weather[0].description){
//                 case ('few clouds'):
//                     console.log('few clouds')
//                 break;
                
//                 case ('scattered clouds'):
//                     console.log('scattered clouds')
//                 break;

//                 case ('broken clouds'):
//                     console.log('broken clouds')
//                 break;

//                 case ('overcast clouds'):
//                     console.log('overcast clouds')
//                 break;
//             }
//         break;

//         case ('Snow'):
//             console.log('Snow')
//             switch(weather.weather[0].description){
//                 case ('light snow'):
//                     console.log('light snow')
//                 break;

//                 case ('Snow'):
//                     console.log('Snow')
//                 break;

//                 case ('Heavy snow'):
//                     console.log('Heavy snow')
//                 break;

//                 case ('Rain and snow'):
//                     console.log('Rain and snow')
//                 break;
//             }
//         break;

//         case ('Rain'):
//             console.log('Rain')
//             switch(weather.weather[0].description){
//                 case ('light rain'):
//                     console.log('light rain')
//                 break;

//                 case ('moderate rain'):
//                     console.log('moderate rain')
//                 break;

//                 case ('heavy intensity rain'):
//                     console.log('heavy intensity rain')
//                 break;

//                 case ('very heavy rain'):
//                     console.log('very heavy rain')
//                 break;
                
//                 case ('extreme rain'):
//                     console.log('extreme rain')
//                 break;

//                 case ('freezing rain'):
//                     console.log('freezing rain')
//                 break;

//                 case ('light intesity shower rain'):
//                     console.log('light intesity shower rain')
//                 break;

//                 case ('shower rain'):
//                     console.log('shower rain')
//                 break;
//             }
//         case ('Thunderstorm'):
//             console.log('Thunderstorm')
//         break;
//     }
//     setHandledData(mood)
// }