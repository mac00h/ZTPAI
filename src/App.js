import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import HowAreYou from './components/HowAreYou';
import UserPreferences from './components/UserPreferences';
import Recommendations from './components/Recommendations';
import Login from './pages/Login';
import { useState } from 'react'

function App() {
  const [statusValue, setStatusValue] = useState('Login')
  return(
    <Router>
      <div className="App">
        <Navbar status = {statusValue}/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Login status = {statValue => setStatusValue(statValue)}/>
            </Route>
            <Route path="/Home">
              <Home/>
            </Route>
            <Route path="/About">
              <About/>
            </Route>
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