import React from 'react';
import {Navigation} from "../../Navigation/Navigation";
import {Redirect} from "react-router-dom";

import { connect } from "react-redux";

const UserRoot = (props) => {
    if (props.auth.token) {
      return (
        <div>
          <Navigation/>
          {props.children}
        </div>
      );
    } else {
      return (
        <Redirect to="/"/>
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

export default connect(mapStateToProps, mapDispatchToProps) (UserRoot);
