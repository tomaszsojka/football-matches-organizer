import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {Navigation} from "./components/Navigation/Navigation";

import {Posts} from "./components/Pages/GuestPages/Posts"

function App() {
  return (
    <Router >
      <Navigation/>
      <Switch>
        <Route exact path={"/"}/>
        <Route exact path={"/posts"} component={Posts}/>
      </Switch>
    </Router>
  );
}

export default App;
