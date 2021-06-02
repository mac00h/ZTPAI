import { useEffect, useState } from 'react'
import axios from 'axios'
import Songs from './Songs'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

const Recommendations = (props) => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const [token, setToken] = useState('null')
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
    
    const getRecommendations = (genres, id, seeds, popularity) => {
        if(token !== 'null'){
            axios(`https://api.spotify.com/v1/recommendations?limit=12&market=US&seed_artists=${id}&seed_genres=${genres.firstGenre}%2C%20${genres.secondGenre}%2C%20${genres.thirdGenre}&target_energy=${seeds.energy}&min_tempo=${seeds.minTempo}&max_tempo=${seeds.maxTempo}&target_valence=${seeds.positivity}&target_popularity=${popularity}`, {
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
    let token2 = Cookies.get('token')
    let decoded = jwt_decode(token2)
    const postUserPreferences = async (genres, artistname, popularity) => {
        const resp = await fetch(`http://localhost:4000/pref/${decoded._id}`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                firstGenre: genres.firstGenre,
                secondGenre: genres.secondGenre,
                thirdGenre: genres.thirdGenre,
                optionalArtist: artistname,
                optionalPopularity: popularity
            })
        })

        const data = await resp.json()
        console.log('preferences for user ', decoded._id, " added")
        return data
    }

    useEffect(() => {
        postUserPreferences(props.genres, props.userinp.userArtist, props.userinp.userPopularity)
    }, [])

    useEffect(() => {
        if(Cookies.get('spotifyToken')){
            getArtistID(props.userinp.userArtist)
        } 
    }, [token])

    useEffect(() => {
        if(Cookies.get('artistID')){
            getRecommendations(props.genres, artistID, props.seeds, props.userinp.userPopularity)
        }
    }, [artistID])
    return (
        <div >
            {loaded ? <Songs responseObj = {genres}/> : <h2>Loading recommendations..</h2>}
            <div className="reco">
            {/* <button className="fetchSongs" onClick={() => getRecommendations(props.genres, artistID, props.seeds, props.userinp.userPopularity)}>Refresh songs</button> */}
            </div>
        </div>
    );
}
 
export default Recommendations;
