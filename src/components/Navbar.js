import weamuseLogo from '../img/weamuseLogo.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
const Navbar = (props) => {

    let history = useHistory();
    let logout;
    function handleClick() {
        localStorage.clear();
        history.push('/')
    }
    if(props.status === 'Logout'){
        logout = <button onClick={handleClick}>{props.status}</button>
    }
    return (
        <nav className="navbar">
            <img src = {weamuseLogo} alt="Logo"/>
            <div className="links">
                <Link to="/Home">Home</Link>
                <Link to="/About">About</Link>
                <Link to="/Register">Register</Link>
                {logout}
            </div>
        </nav>
     );
}
 
export default Navbar;