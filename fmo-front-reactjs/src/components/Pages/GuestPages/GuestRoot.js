import React from 'react';

import "./GuestPage.css";
import AccessAccount from "./AccessAccount";
import {Redirect} from "react-router-dom";

import { connect } from "react-redux";

const GuestRoot = (props) => {
  if (props.auth.tokens) {
    return <Redirect to="/user"/>
  } else {
    return (
        <div className="flex guestRoot-container">
          <div>
              <h1>LOGO</h1>
              <p>This is short describtion of this application...</p>
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
