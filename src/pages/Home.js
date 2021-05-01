import '../css/home.css';
import React, { useEffect, useState } from 'react';
import Weatherapp from '../components/Weatherapp';
import axios from 'axios';

const spotifyID = "036eee56c768432ba2375518f5138fc9";
const spotifySecret = "3ce6a987312e4f619361c045e710d96e";

const Home = () => {
    const [token, setToken] = useState('');
    const [genres, setGenres] = useState([]);
    const [status, setStatus] = useState('false');

    useEffect(() => {
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

            axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
                method: 'GET',
                headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
            }).then(genreResponse => {
                setGenres(genreResponse.data.categories.items)
                console.log(genres);
            });
        });
    }, [status]);

    return (
        <div className="home">
            <Weatherapp/>
            <button onClick={() => setStatus(!status)}>
                Click me!
            </button>
        </div>
    );
}
 
export default Home;