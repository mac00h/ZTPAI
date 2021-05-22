import '../css/home.css';
import { useEffect, useState } from 'react';
import Weatherapp from '../components/Weatherapp';
import UserPreferences from '../components/UserPreferences'
import HowAreYou from '../components/HowAreYou'
import Recommendations from '../components/Recommendations';
import User from '../components/User';

const Home = () => {
    let loadedComponent;
    let button;
    const [load, setLoad] = useState(0)
    const [userMood, setUserMood] = useState('null');
    const [userGenres, setUserGenres] = useState({
        firstGenre: 'null',
        secondGenre: 'null',
        thirdGenre: 'null'
    })

    if(load === 0){
        loadedComponent = <HowAreYou passMood = {mood => setUserMood(mood)}/>
        if(userMood !== 'null'){
            setLoad(load+1)
            console.log('mood loaded')
        }
    }

    if(load === 1){
        loadedComponent = <UserPreferences passGenres = {genres => setUserGenres({
            firstGenre: genres.first,
            secondGenre: genres.second,
            thirdGenre: genres.third
        })}/>
        if(userGenres.thirdGenre !== 'null'){
            setLoad(load+1)
            console.log('genres loaded')
        }
    }

    if(load === 2){
        loadedComponent = <Recommendations mood = {userMood} genres = {userGenres}/>
        button = null
    }

    return (
        <div className="home">
            <div className="cnt">
            <Weatherapp/>
            {loadedComponent}
            </div>
        </div>
    );
}
 
export default Home;