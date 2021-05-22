import { useEffect, useState } from 'react'
import axios from 'axios'
import Songs from './Songs'

const spotifyID = process.env.REACT_APP_SPOTIFY_ID
const spotifySecret = process.env.REACT_APP_SPOTIFY_SECRET

const Recommendations = (props) => {

    const [token, setToken] = useState('null')
    const [genres, setGenres] = useState({})
    const [status, setStatus] = useState(false)
    const [loaded, setLoaded] = useState(false)
    useEffect(async() => {
        axios('https://accounts.spotify.com/api/token', {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + btoa(spotifyID + ':' + spotifySecret)
              },
            data: 'grant_type=client_credentials',
            method: 'POST'
        })
        .then(tokenResponse => {
            setToken(tokenResponse.data.access_token);
            console.log(token);
        })

        const result = await fetch(`https://api.spotify.com/v1/recommendations?limit=12&market=US&seed_genres=${props.genres.firstGenre}%2C%20${props.genres.secondGenre}%2C%20${props.genres.thirdGenre}`, {
            headers: {
                'Authorization' : 'Bearer ' + token
            }
        })
        const data = await result.json();
        setGenres(data)
        setLoaded(true)
        console.log(data)
    }, [status])

    return (
        <div>
            {genres.tracks ? <Songs responseObj = {genres}/> : null}
            <button onClick={()=>setStatus(!status)}>Press me to fetch songs.</button>
        </div>
    );
}
 
export default Recommendations;