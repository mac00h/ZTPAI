import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import HowAreYou from './components/HowAreYou';
import UserPreferences from './components/UserPreferences';
import Recommendations from './components/Recommendations';
import Login from './pages/Login';
import { useState, useEffect } from 'react'
import auth, {serverAuth} from './scripts/auth';
import Cookies from 'js-cookie'
function App() {
  const [statusValue, setStatusValue] = useState()
  const [isUserAuthenticated, setIsUserAuthenticated] = useState()
  useEffect(() => {
    if(Cookies.get('isAuth')){
      setIsUserAuthenticated(true)
      setStatusValue('Logout')
    }else{
      setIsUserAuthenticated(false)
      setStatusValue('Login')
    } 
  }, [Cookies.get('isAuth')])

  return(
    <Router>
      <div className="App">
        <Navbar status = {statusValue}/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/Home"> 
              <Home isUser = {isUserAuthenticated}/>
            </Route>
            <Route path="/About">
              <About/>
            </Route>
            <Route path="/HowAreYou" render={() => ( isUserAuthenticated ? <HowAreYou/> : <Redirect to='/'/>)}/>
            <Route path="/UserPreferences" render={() => ( isUserAuthenticated ?  <UserPreferences/> : <Redirect to='/'/>)}/>
            <Route path="/Recommendations" render={() => ( isUserAuthenticated ?  <Recommendations/> : <Redirect to='/'/>)}/>
            <Route path="/Register">
              <Register/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;