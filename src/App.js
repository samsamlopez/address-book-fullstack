import React from 'react';
import './App.css';
import Routes from "./routes";
import { HashRouter, Link } from 'react-router-dom';


class App extends React.Component{
  constructor(){
    super()
    this.state = {
      name: "Samuel"
    }
  }

  render() {
    return (
      <HashRouter>
        <Link to='/'></Link>
        <Routes name={this.state.name} />
      </HashRouter>
    );
  }
}

export default App;
