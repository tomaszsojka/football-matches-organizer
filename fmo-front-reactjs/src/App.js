import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import UserRoot from "./components/UserRoot";

import GuestHome from "./components/Pages/GuestPages/GuestHome";
import {Posts} from "./components/Pages/UserPages/Posts";

import {Error} from "./components/Pages/Error";


function App() {

  const urls = [
    "posts"
  ];
  console.log(urls);
  return (

    <Router >
      {/* <Navigation/>
      <Switch>
        <Route exact path={"/posts"} component={Posts}/>
        <Route exact path={"/access-account"} component={AccessAccount}/>
      </Switch> */}
      
      <Switch>
        <Route  exact path={"/"} component={GuestHome}/>

        <Route
          path="/user"
          render={({ match: { url } }) => (
            <UserRoot>
              <Route path={`${url}/posts`} component={Posts} />
            </UserRoot>
          )}
        />
        {/* <Route exact path={"/user/:rest"} 
          render={({ match }) => (
            
            <>
            {urls.some(url => match.params.rest === url || "" === url) 
              ? 
              <UserRoot>
                <br/>
                <br/>
                <br/>
                <h1>{match.isExact.toString()}</h1>
                {match.params.rest === `${urls[0]}` && <Route exact path={`${match.url}`} component={Posts}/>}
              </UserRoot> 
              : 
              <Route component={Error}/> 
            }
            </>
            
          )} 
        /> */}
        <Route component={Error}/>
      </Switch>

    </Router>
  );
}

export default App;
