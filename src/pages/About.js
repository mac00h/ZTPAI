import react from '../img/reactIcon.png'
import nodejs from '../img/nodejslogo.png'
import mongo from '../img/mongologo.png'
import '../css/about.css'
const About = () => {

    return (  
        <div className="about">
            <div className="technologies">
                <div>This web application was created for college project. </div><br></br>
                <div className="appinfo">It uses OpenWeatherMap API and Geolocation to show weather in your city. Asks user some information and recommends songs using SpotifyWeb API.</div> <div></div>
                <br></br><div>You need to create account to use this application.</div>
                <br></br>
                <div>Technologies used:</div>
                <div className="technologiesUsed">
                    <img className="react" alt="React" src={react}/>
                    <img className="nodejs" alt="Nodejs" src={nodejs}/>
                    <img className="mongo" alt="MongoDB" src={mongo}/>
                </div>
            </div>
        </div>
    );
}

 
export default About;