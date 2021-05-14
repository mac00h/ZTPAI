import React, { useState } from 'react';

const Register = () => {

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [usernameValue, setUsernameValue] = useState('');
    const [ageValue, setAgeValue] = useState('');

    const addUser = async () => {
        const resp = await fetch("http://localhost:4000/users", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue,
                username: usernameValue,
                age: ageValue
            })
        }) 

        const data = await resp.json()
        console.log("new user added", data);
        return data;
    }

    return ( 
        <div className="registerContainer">
            <div className="emailCon">
                Email:
                <input type="text" autocomplete="off" value={emailValue || ""} onChange={e => setEmailValue(e.target.value)}/>
            </div>
            <div className="passwordCon">
                Password:
                <input type="text" autocomplete="off" value={passwordValue || ""} onChange={e => setPasswordValue(e.target.value)}/>
            </div>
            <div className="usernameCon">
                Username:
                <input type="text" autocomplete="off" value={usernameValue || ""} onChange={e => setUsernameValue(e.target.value)}/>
            </div>
            <div className="ageCon">
                Age:
                <input type="text" autocomplete="off" value={ageValue || ""} onChange={e => setAgeValue(e.target.value)}/>
            </div>
            <button onClick={addUser}>Register me!</button>
        </div>
    );
}
 
export default Register;