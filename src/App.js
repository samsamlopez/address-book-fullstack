import React from 'react';
import './App.css';
import Routes from "./routes";
import { HashRouter, Link } from 'react-router-dom';


class App extends React.Component{
  render() {
    return (
      <HashRouter>
        <Link to='/'></Link>
        <Routes />
      </HashRouter>
    );
  }
}

export default App;
