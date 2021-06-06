import { useEffect, useState } from 'react'
import axios from 'axios'
import Songs from './Songs'
import Cookies from 'js-cookie'
import '../css/songs.css'

const Recommendations = (props) => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const [token, setToken] = useState('null')
    const [userSongs, setUserSongs] = useState('null')
    const [artistID, setArtistID] = useState()
    const [loaded, setLoaded] = useState(false)
    const getToken = async () => {
        const resp = await fetch('http://localhost:4000/spotify/getToken', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        
        const data = await resp.json()
        setToken(data.access_token)
    }

    useEffect(() => {
        getToken()
    }, [])

    useEffect(() => {
        if(token !== 'null'){
            getArtist(token, props.userinp.userArtist)
        }else{
            console.log('token is not ready')
        }
    }, [token])

    useEffect(() => {
        if(artistID !== null){
            getRecommendations(token, props.genres, artistID, props.seeds, props.userinp.userPopularity)
        }else{
            console.log('artistid=', artistID)
        }
    }, [artistID])

    const getArtist = async (tk, artist) => {
        axios.get(`http://localhost:4000/spotify/getArtistID/?artist=${artist}&token=${tk}`, {
        }).then((response) => {
            console.log(response)
            setArtistID(response.data)
            console.log('gut')
        }).catch(err => {
            console.log(err)
            console.log('bat')
        })
    }

    const getRecommendations = async (token, genres, id, seeds, popularity) => {
        axios.get(`http://localhost:4000/spotify/getRecommendations/?artistID=${id}&token=${token}&firstGenre=${genres.firstGenre}&secondGenre=${genres.secondGenre}&thirdGenre=${genres.thirdGenre}&energy=${seeds.energy}&minTempo=${seeds.minTempo}&maxTempo=${seeds.maxTempo}&positivity=${seeds.positivity}&popularity=${popularity}`, {
        }).then((response) => {
            setUserSongs(response.data)
            setLoaded(true)
        }).catch(err => {
            console.log(err)
        }) 
    }

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };

    let token2 = parseJwt(Cookies.get('token'))
    const postUserPreferences = async (genres, artistname, popularity) => {
        const resp = await fetch(`http://localhost:4000/pref/${token2._id}`, {
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
        console.log('preferences for user ', token2._id, " added")
        return data
    }

    useEffect(() => {
        postUserPreferences(props.genres, props.userinp.userArtist, props.userinp.userPopularity)
    }, [])

    return (
        <div className="recommended">
            {loaded ? <Songs responseObj = {userSongs}/> : <h2>Loading recommendations..</h2>}
            <div className="reco">
            {/* <button className="fetchSongs" onClick={() => getRecommendations(props.genres, artistID, props.seeds, props.userinp.userPopularity)}>Refresh songs</button> */}
            </div>
        </div>
    );
}
 
export default Recommendations;
