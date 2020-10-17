import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {Navigation} from "./components/Navigation/Navigation";

import {AccessAccount} from "./components/Pages/GuestPages/AccessAccount"
import {Posts} from "./components/Pages/UserPages/Posts";


function App() {
  return (
    <Router >
      <Navigation/>
      <Switch>
        <Route exact path={"/"}/>
        <Route exact path={"/posts"} component={Posts}/>
        <Route exact path={"/access-account"} component={AccessAccount}/>
      </Switch>
    </Router>
  );
}

export default App;
