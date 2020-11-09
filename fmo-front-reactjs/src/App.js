import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from "react-router-dom";

import UserRoot from "./components/UserRoot";
import {Navigation} from "./components/Navigation/Navigation";

import GuestHome from "./components/Pages/GuestPages/GuestHome";
import {Posts} from "./components/Pages/UserPages/Posts";

import {Error} from "./components/Pages/Error";


function App() {

  let ulr = ""
  return (

    <Router >
      {/* <Navigation/>
      <Switch>
        <Route exact path={"/posts"} component={Posts}/>
        <Route exact path={"/access-account"} component={AccessAccount}/>
      </Switch> */}
      
      <Switch>
      <Route  exact path={"/"} component={GuestHome}/>
      <Route path={"/user"} 
        render={({ match: { path } }) => (
          <UserRoot>
            <Route exact path={`${path}/posts`} component={Posts}/>
            
          </UserRoot>
        )
        
        } 
      />
      <Route component={Error}/>
      </Switch>

    </Router>
  );
}

export default App;
