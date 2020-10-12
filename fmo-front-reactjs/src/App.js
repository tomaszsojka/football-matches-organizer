import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {Navigation} from "./components/Navigation/Navigation";
import './App.css';

function App() {
  return (
    <Router >
      <Navigation/>
      <Switch>
        <Route exact path={"/"}/>
      </Switch>
    </Router>
  );
}

export default App;
