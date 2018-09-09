import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./App.css";

class App extends Component{
  render(){
    return(
      <div className="App">
        <h1> Hello, World! </h1>
		<h2> My name is Matthew!!! </h2>
      </div>
    );
  }
}

export default hot(module)(App);