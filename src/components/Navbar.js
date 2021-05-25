import weamuseLogo from '../img/weamuseLogo.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
const Navbar = (props) => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    let history = useHistory();
    const [logValue, setLogValue] = useState()
    function handleClick() {
        Cookies.set('token', null)
        Cookies.set('isAuth', null)
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
                <Link to="/Register">Register</Link>
                <button onClick={handleClick}>{logValue}</button>
            </div>
        </nav>
     );
}
 
export default Navbar;