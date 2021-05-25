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
  const [test, setTest] = useState()
  useEffect(() => {
    if(console.log(Cookies.get('isAuth')) === 200){
      setTest('HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
      setStatusValue('Logout')
    }else{
      setTest('YHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
      setStatusValue('Login')
    } 
  }, [])
    // useEffect(() => {
    //   if(statusValue === 'loggedin'){
    //   
    //     setStatusValue('Logout')
    //   }
    //   if(statusValue === 'notloggedin'){
    //     
    //     setStatusValue('Login')
    //   }
    // }, [statusValue]);
  return(
    <Router>
      <div className="App">
        <Navbar status = {statusValue}/>
        <h1>{test}</h1>
        <h1>{statusValue}</h1>
        <div className="content">
          <Switch>
            <Route exact path="/">
            {/* status = {statValue => setStatusValue(statValue)} */}
              <Login status = {statValue => setStatusValue(statValue)}/>
            </Route>
            <Route path="/Home">
              <Home/>
            </Route>
            <Route path="/About"
              render={() => statusValue !== null ? <About/> : <h1>You can't view this page. Log in first! Redirecting... <Redirect to="/"/></h1> }/>
            <Route path="/HowAreYou">
              <HowAreYou/>
            </Route>
            <Route path="/UserPreferences">
              <UserPreferences/>
            </Route>
            <Route path="/Recommendations">
              <Recommendations/>
            </Route>
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