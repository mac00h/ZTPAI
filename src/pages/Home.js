import '../css/home.css';
import { useEffect, useState } from 'react';
import Weatherapp from '../components/Weatherapp';
import UserPreferences from '../components/UserPreferences'
import HowAreYou from '../components/HowAreYou'
import Recommendations from '../components/Recommendations';

const Home = () => {
    let loadedComponent;
    let button;
    const [load, setLoad] = useState(0)
    function handleClick(){
        setLoad(load+1)
    }

    if(load === 0){
        loadedComponent = <HowAreYou/>
        button = <button onClick={handleClick}>Continue</button>
    }

    if(load === 1){
        loadedComponent = <UserPreferences/>
        button = <button onClick={handleClick}>Continue</button>
    }

    if(load === 2){
        loadedComponent = <Recommendations/>
        button = null
    }

    return (
        <div className="home">
            <div className="cnt">
            <Weatherapp/>
            {loadedComponent}
            </div>
            {button}
        </div>
    );
}
 
export default Home;