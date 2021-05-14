import React, { useEffect, useState } from 'react';
import { UserAPI } from '../api/user.api';
import { UserDTO } from '../api/dto/user.dto';
import User from '../components/User';

const About = () => {

    const[user, setUser] = useState([])

    useEffect(() => {
        async function fetchAll() {
            const resp = await UserAPI.getAll();
            setUser(resp);
        }

        fetchAll();
    }, [])
    return (  
        <div className="about">
            <h2>This is about page.</h2>
            <ul>
            {user.map((userr) => {
                return <User data={userr}/>;
            })}
            </ul>
        </div>
    );
}

 
export default About;