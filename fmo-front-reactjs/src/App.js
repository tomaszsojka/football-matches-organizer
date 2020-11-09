import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

import UserRoot from "./components/UserRoot";
import {Navigation} from "./components/Navigation/Navigation";

import {AccessAccount} from "./components/Pages/GuestPages/AccessAccount"
import {Posts} from "./components/Pages/UserPages/Posts";

import {Error} from "./components/Pages/Error";


function App() {
  return (

    <Router >
      {/* <Navigation/>
      <Switch>
        <Route exact path={"/posts"} component={Posts}/>
        <Route exact path={"/access-account"} component={AccessAccount}/>
      </Switch> */}
      
      <Switch>
      <Route  exact path={"/"} component={AccessAccount}/>
      <Route path={"/user"} 
        render={({ match: { path } }) => (
          <UserRoot>
            {/* <Route exact path={""} component={UserRoot}/> */}
            <Route exact path={`${path}/posts`} component={Posts}/>
          </UserRoot>
        )} 
      />

      <Redirect to="/404" />
      <Route component={Error}/>
      </Switch>
    </Router>
  );
}

export default App;
