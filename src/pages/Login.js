import { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/login.css'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = (props) => {

    const [usernameValue2, setUsernameValue2] = useState('');
    const [passwordValue2, setPasswordValue2] = useState('');
    const [state, setState] = useState()
    let history = useHistory();
    let sthWrong;

    const delay = ms => new Promise(res => setTimeout(res, ms));
    const UserAuthenticated = async () => {
        await delay(1000)
        const data = await axios.get('http://localhost:4000/users/isUserAuth', {
            headers: {
                'auth-token': Cookies.get('token')
            }
        }).then((response) => {
            console.log(response)
            Cookies.set('isAuth', response.status)
            // setState('loggedin')
            // props.status('loggedin')
            history.push('/Home')
            window.location.reload()
            // window.location.reload()
        }).catch((err) => {
            Cookies.set('isAuth', 400)
            // setState('notLoggedIN')
            // props.status('notloggedin')
            console.log(err)
        });
        return data;
    }

    const LoginUser = () => {
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
                Cookies.set('token', json.token)
            }).catch((err) => {
                console.log('fetch failed', err)})
            UserAuthenticated()

    }
    return (
        <div className="loginPage">
            <div className="loginContainer">
                    <h1>Login to continue!</h1>
                    <input type="text" name="email" placeholder="Username" value={usernameValue2 || ""} onChange={e => setUsernameValue2(e.target.value)}></input>
                    <input type="password" name="password" placeholder="Password" value={passwordValue2 || ""} onChange={e => setPasswordValue2(e.target.value)}></input>
                    <button type="submit" name="submit" onClick={LoginUser}>Login</button>
                    {sthWrong}
            </div>
            <div className="noAccount">
                <h2>You don't have an account?</h2>
                <button type="register" onClick={() => {history.push('/Register')}}>I want to register!</button>
            </div>
            {state}
        </div>
    );
}
 
export default Login;