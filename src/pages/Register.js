import React, { useState } from 'react';
import { UserAPI } from '../api/user.api';

const Register = () => {

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const createUser = async () => {
        const resp = await UserAPI.createOne({
            email: emailValue,
            password: passwordValue,
        });

        console.log("new user", resp);
    }

    return ( 
        <div className="registerContainer">
            <div className="emailCon">
                Email:
                <input type="text" value={emailValue || ""} onChange={e => setEmailValue(e.target.value)}/>
            </div>
            <div className="passwordCon">
                Password:
                <input type="text" value={passwordValue || ""} onChange={e => setPasswordValue(e.target.value)}/>
            </div>
            <button onClick={createUser}>Register me!</button>
        </div>
    );
}
 
export default Register;