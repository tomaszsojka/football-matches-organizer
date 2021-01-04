import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";


import GuestRoot from "./components/Pages/GuestPages/GuestRoot";
import UserRoot from "./components/Pages/UserPages/UserRoot";
import Posts from "./components/Pages/UserPages/Posts";
import Profile from "./components/Pages/UserPages/Profile";
import Contact from "./components/Pages/UserPages/Contact";
import Teams from "./components/Pages/UserPages/Teams/Teams";
import AddTeam from "./components/Pages/UserPages/Teams/AddTeam";

import TeamPosts from "./components/Pages/UserPages/Teams/TeamPosts";
import TeamCalendar from"./components/Pages/UserPages/Teams/TeamCalendar";

import Error from "./components/Pages/Error";


function App() {

  return (

    <Router >      
      <Switch>
        <Route  exact path={"/"} component={GuestRoot}/>
        {/* <PrivateRoute path={"/user"} 
          render={({ match: { url } }) => (
            <UserRoot>
              <Route path={`${url}/posts`} render={() => <Posts/>} />
            </UserRoot>
          )}/> */}
        <Route path={"/user"}>
          <UserRoot>
            <Switch>
              <Route exact path={"/user"}>
                <Posts/>
              </Route>
              <Route exact path={"/user/profile"}>
                <Profile/>
              </Route>
              <Route exact path={"/user/contact"}>
                <Contact/>
              </Route>
              <Route exact path={"/user/teams"}>
                <Teams/>
              </Route>
              <Route exact path={"/user/teams/add-team"}>
                <AddTeam/>
              </Route>
              <Route exact path={"/user/teams/:teamId"}>
                <TeamPosts/>
              </Route>
              <Route exact path={"/user/teams/:teamId/calendar"}>
                <TeamCalendar/>
              </Route>
              <Error message="User path do not exist!"/>
            </Switch>
          </UserRoot>
        </Route>
        <Route exact path={"/401"}>
          <Error message="Authentication error, go back to main page and login!"/>
        </Route>
        <Route exact path={"/404"}>
          <Error message="Path do not exist!"/>
        </Route>
        <Redirect to={"/404"}/>
      </Switch>

    </Router>
  );
}

export default App;
