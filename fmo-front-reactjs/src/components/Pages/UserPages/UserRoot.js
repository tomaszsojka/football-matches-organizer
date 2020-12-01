import React from 'react';
import {Navigation} from "../../Navigation/Navigation";
import auth from "../../../Auth";
import {Redirect} from "react-router-dom";


const UserRoot = (props) => {
    let token = auth.getToken();
    let isAuth = auth.isAuthenticated();
    if (token) {
      if(!isAuth) {
        return (
          <Redirect to="/404"/>
        );
      }else {
        return (
          <div>
            <Navigation/>
            {props.children}
          </div>
        );
      }
    } else {
      return (
        <Redirect to="/"/>
      );
    }
}

export default UserRoot;
