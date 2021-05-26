import { useEffect, useState } from 'react'
import axios from 'axios'
import Songs from './Songs'
import Cookies from 'js-cookie'

const Recommendations = (props) => {

    const [token, setToken] = useState('null')
    const [genres, setGenres] = useState({})
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

    useEffect(() => {
        getToken()
    }, [])

    const getRecommendations = () => {
        if(token !== 'null'){
            axios(`https://api.spotify.com/v1/recommendations?limit=12&market=US&seed_genres=${props.genres.firstGenre}%2C%20${props.genres.secondGenre}%2C%20${props.genres.thirdGenre}`, {
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
            getRecommendations()
        } 
    }, [token])

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