import React from 'react';
import {Navigation} from "./Navigation/Navigation";
import {Redirect} from "react-router-dom";


function UserRoot(props) {

  const ren =       
  <div>
    <Navigation/>
    {props.children}
  </div>;

  console.log(props.children);
  if(!React.Children.count(props.children)) {
    
    ren = <Redirect to="/404"/>;
  }

  return (
      // <div>
      //   <Navigation/>
      //   {props.children}
      // </div>
      <div>
        {ren}
      </div>
  );
}

export default UserRoot;
