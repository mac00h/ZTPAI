import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Weatherapp from './components/Weatherapp';

class App extends React.Component {

  constructor(props){
    super(props);

  }
  render() {
    const title = "WeamuseApplication";
    return(
        <div className="App">
          <Navbar/>
          <div className="content">
            <Weatherapp/>
          </div>
        </div>
    );
  }
}

export default App;