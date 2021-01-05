import React from 'react';

import "./GuestPage.css";
import AccessAccount from "./AccessAccount";
import {Redirect} from "react-router-dom";

import { connect } from "react-redux";

const GuestRoot = (props) => {

  if (props.auth.token) {
    return <Redirect to="/user"/>
  } else {
    return (
        <div className="flex guestRoot-container">
          <div>
              {/* <h1>FMO</h1> */}
              <img src="Images/LOGO_BIG.svg" alt="logo" className="guestLogo-img"/>
              
              <p> FOR AMATEUR PLAYERS AND FOOTBALL FREAKS...</p>
          </div>
          <AccessAccount/>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      auth: state.authReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (GuestRoot);
