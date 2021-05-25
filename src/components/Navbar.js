import weamuseLogo from '../img/weamuseLogo.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
const Navbar = (props) => {
    let history = useHistory();
    const [logValue, setLogValue] = useState()
    function handleClick() {
        Cookies.remove('token')
        Cookies.remove('isAuth')
        Cookies.remove('weatherData')
        Cookies.remove('latitude')
        Cookies.remove('longitude')
        history.push('/')
        window.location.reload()
    }
    useEffect(() => {
        setLogValue(props.status)
    }, [props.status])
    return (
        <nav className="navbar">
            <img src = {weamuseLogo} alt="Logo"/>
            <div className="links">
                <Link to="/Home">Home</Link>
                <Link to="/About">About</Link>
                {logValue === 'Logout' ? null : <Link to="/Register">Register</Link>}
                <button onClick={handleClick}>{logValue}</button>
            </div>
        </nav>
     );
}
 
export default Navbar;