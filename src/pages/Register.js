import { useState} from 'react';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import '../css/register.css'

const Register = () => {
    let history = useHistory()
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
        alert("Account created!", data.username)
        return data
    }

    return (
        <div className="mainCon">
        <div className="registerContainer">
                <input type="text" autoComplete="off"  placeholder="Email" value={emailValue || ""} onChange={e => setEmailValue(e.target.value)}/>
                <input type="password" name="password" autoComplete="off" placeholder="Password" value={passwordValue || ""} onChange={e => setPasswordValue(e.target.value)}/>
                <input type="text" autoComplete="off" placeholder="Username" value={usernameValue || ""} onChange={e => setUsernameValue(e.target.value)}/>
                <input type="text" autoComplete="off" placeholder="Age" value={ageValue || ""} onChange={e => setAgeValue(e.target.value)}/>
            <button type ="registerme" onClick={addUser}>Register me!</button>
        </div>

        <div className="gotTheAccount">
            <h2>Already have an account?</h2>
            <button type="register" onClick={() => {history.push('/')}}>Login to continue!</button>
        </div>
        </div>
    );
}
 
export default Register;