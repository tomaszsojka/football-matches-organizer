import React from 'react';

import "./GuestPage.css";
import AccessAccount from "./AccessAccount";
import {Redirect} from "react-router-dom";
import auth from "../../../Auth";

const GuestRoot = (props) => {
  if (auth.getToken()) {
    return <Redirect to="/user"/>
  } else {
    return (
        <div className="flex guestRoot-container">
          <div>
              <h1>LOGO</h1>
              <p>Thins is short descibtion of this application...</p>
          </div>
          <AccessAccount/>
        </div>
    );
  }
}

export default GuestRoot;
