import { useEffect, useState } from 'react'
import axios from 'axios'
import react from '../img/reactIcon.png'
import nodejs from '../img/nodejslogo.png'
import mongo from '../img/mongologo.png'
import '../css/about.css'
const About = () => {

    return (  
        <div className="about">
            <h2>This page uses:</h2>
            <div className="technologies">
                <img className="react" src={react}/>
                <img className="nodejs" src={nodejs}/>
                <img className="mongo" src={mongo}/>
            </div>
        </div>
    );
}

 
export default About;