import React from 'react';
import {Navigation} from "./Navigation/Navigation";
import {Redirect} from "react-router-dom";


function UserRoot(props) {

  console.log(React.Children.count(props.children));
  if(!React.Children.count(props.children)) {
    
    return (<Redirect to="/404"/>);
  }

  return (
      <div>
        <Navigation/>
        {props.children}
      </div>
  );
}

export default UserRoot;
