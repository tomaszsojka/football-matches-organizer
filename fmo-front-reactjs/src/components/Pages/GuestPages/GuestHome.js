import React from 'react';

import "./AccessAccount.css";
import {AccessAccount} from "./AccessAccount";

function GuestHome(props) {

  return (
      <div className="guestHome-container">
        <div>
            <h1>LOGO</h1>
            <p>Thins is short descibtion of this application...</p>
        </div>
        <AccessAccount/>
      </div>
  );
}

export default GuestHome;
