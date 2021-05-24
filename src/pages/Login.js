import { useState, useEffect } from 'react'
import parseJwt from '../scripts/parseJWT';
import handleError from '../scripts/handleError';
import axios from 'axios'
import '../css/login.css'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Login = (props) => {

    const [usernameValue2, setUsernameValue2] = useState('');
    const [passwordValue2, setPasswordValue2] = useState('');
    const [statusCode, setStatusCode] = useState(null);
    let history = useHistory();

    const delay = ms => new Promise(res => setTimeout(res, ms));
    const userAuthenticated = async () => {
        await delay(1000)
        axios.get('http://localhost:4000/users/isUserAuth', {
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response.status)
            localStorage.setItem("isAuth", response.status)
        }).catch((err) => {
            console.log(err)
        });
    }

    const LoginUser = async () => {
        localStorage.clear()
        fetch("http://localhost:4000/users/login", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: usernameValue2,
                password: passwordValue2
            })
        }).then((response) => response.json()
            .catch(err => {
                console.log(err)
                return {};
            })).then((json) => {
                console.log(json);
                setStatusCode(json.status)
                localStorage.setItem("token", json.token)
            }).catch((err) => {
                console.log('fetch failed', err)})
        
        userAuthenticated()
        await delay(1100)
        history.push('/Home')
    }

    useEffect(() => {
        if(statusCode === 'ok'){
            props.status('Logout')
        }else{
            props.status('Login')
        }
    }, [statusCode])


    return (
        <div className="loginPage">
            <div className="loginContainer">
                    <h1>Login to continue!</h1>
                    <input type="text" name="email" placeholder="Username" value={usernameValue2 || ""} onChange={e => setUsernameValue2(e.target.value)}></input>
                    <input type="password" name="password" placeholder="Password" value={passwordValue2 || ""} onChange={e => setPasswordValue2(e.target.value)}></input>
                    <button type="submit" name="submit" onClick={LoginUser}>Login</button>
            </div>
            <div className="noAccount">
                <h2>You don't have an account?</h2>
                <button type="register" onClick={() => {history.push('/Register')}}>I want to register!</button>
            </div>
        </div>
    );
}
 
export default Login;