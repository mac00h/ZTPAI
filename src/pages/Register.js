import { useState } from 'react';
import axios from 'axios';

const Register = () => {

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [usernameValue, setUsernameValue] = useState('');
    const [ageValue, setAgeValue] = useState('');

    const [usernameValue2, setUsernameValue2] = useState('');
    const [passwordValue2, setPasswordValue2] = useState('');

    const[loginStatus, setLoginStatus] = useState(false);
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

    var handleError = function (err) {
        console.warn(err);
        return new Response(JSON.stringify({
            code: 400,
            message: 'Stupid network Error'
        }));
    };

    const loginUser = async () => {
        const resp = await fetch("http://localhost:4000/users/login", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: usernameValue2,
                password: passwordValue2
            })
        }).catch(handleError)

        if(resp.ok){
            const data = await resp.json()
            localStorage.setItem("token", data.token)
            console.log(data)
            setLoginStatus(true)
            return data
        } else {
            setLoginStatus(false)
            return Promise.reject(resp)
        }

    }

    const userAuthenticated = () => {
        axios.get('http://localhost:4000/users/isUserAuth', {
            headers: {
                'auth-token': localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response)
        });
    }

    return (
        <div>
        <div className="registerContainer">
            <div className="emailCon">
                Email:
                <input type="text" autoComplete="off" value={emailValue || ""} onChange={e => setEmailValue(e.target.value)}/>
            </div>
            <div className="passwordCon">
                Password:
                <input type="text" autoComplete="off" value={passwordValue || ""} onChange={e => setPasswordValue(e.target.value)}/>
            </div>
            <div className="usernameCon">
                Username:
                <input type="text" autoComplete="off" value={usernameValue || ""} onChange={e => setUsernameValue(e.target.value)}/>
            </div>
            <div className="ageCon">
                Age:
                <input type="text" autoComplete="off" value={ageValue || ""} onChange={e => setAgeValue(e.target.value)}/>
            </div>
            <button onClick={addUser}>Register me!</button>
        </div>
        <div className="loginContainer">
            <h1>Please sign in to continue.</h1>
            <div className="username">
                Usename:
                <input type="text" autoComplete="off" value={usernameValue2 || ""} onChange={e => setUsernameValue2(e.target.value)}/>
            </div>
            <div className="password">
                Password:
                <input type="text" autoComplete="off" value={passwordValue2 || ""} onChange={e => setPasswordValue2(e.target.value)}/>
            </div>
            <button onClick={loginUser}>Log me in!</button>
        </div>
        {loginStatus && (
            <button onClick={userAuthenticated}>Check if authenticated</button>
        )}
        </div>
    );
}
 
export default Register;