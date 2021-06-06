import { useState} from 'react';
import { useHistory } from 'react-router-dom'
import '../css/register.css'

const Register = () => {
    let history = useHistory()
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [usernameValue, setUsernameValue] = useState('');
    const [ageValue, setAgeValue] = useState('');
    const addUser = async () => {
        fetch("http://localhost:4000/users", {
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
        }).then(response => response.json()
            .catch(err => {
                console.log(err)
                return {};
            })).then((json) => {
                console.log(json);
                alert(json.status)
            }).catch(err => {
                console.log('fetch failed', err)})
    }

    return (
        <div className="mainCon">
        <div className="registerContainer">
                <div className="subCon">
                <h2>Fill this form to create an account.</h2>
                <input type="text" autoComplete="off"  placeholder="Email" value={emailValue || ""} onChange={e => setEmailValue(e.target.value)}/>
                <input type="password" name="password" autoComplete="off" placeholder="Password" value={passwordValue || ""} onChange={e => setPasswordValue(e.target.value)}/>
                <input type="text" autoComplete="off" placeholder="Username" value={usernameValue || ""} onChange={e => setUsernameValue(e.target.value)}/>
                <input type="text" autoComplete="off" placeholder="Age" value={ageValue || ""} onChange={e => setAgeValue(e.target.value)}/>
                <button type ="registerme" onClick={addUser}>Register me!</button>
                </div>
        </div>

        <div className="gotTheAccount">
            <div className="accsubCon">
            <h2>Already have an account?</h2>
            <button type="register" onClick={() => {history.push('/')}}>Login to continue!</button>
            </div>
        </div>
        </div>
    );
}
 
export default Register;