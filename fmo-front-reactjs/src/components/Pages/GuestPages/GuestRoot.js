import React from 'react';

import "./GuestPage.css";
import AccessAccount from "./AccessAccount";
import {Redirect} from "react-router-dom";

import { connect } from "react-redux";


import AddDocForm from "./AddDocForm";

const GuestRoot = (props) => {
  const tmp = () => {
    console.log("XD");
  }

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
          <AddDocForm 
            title="asdf" 
            inputs={[
              {name : "input1", type : "text", placeholder : "input1"},
              {name : "input2", type : "text", placeholder : "input2"}]}
            onSubmitForm={() => tmp()}
          />
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
