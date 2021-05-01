import weamuseLogo from '../img/weamuseLogo.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <img src = {weamuseLogo} alt="Logo"/>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/About">About</Link>
                <Link to="/Hru">How are you?</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;