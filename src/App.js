import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Weatherapp from './components/Weatherapp';
import Home from './pages/Home';
import About from './pages/About';
import Hru from './pages/Hru';

function App() {
  return(
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/About">
              <About/>
            </Route>
            <Route path="/Hru">
              <Hru/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;