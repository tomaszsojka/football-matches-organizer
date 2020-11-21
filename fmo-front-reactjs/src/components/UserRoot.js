import React, {useState, useEffect} from 'react';
import {Navigation} from "./Navigation/Navigation";
import auth from "../Auth";
import {sendHttpRequest} from "../Fetch/useFetch";
import {Redirect} from "react-router-dom";


function UserRoot(props) {

  const [isAuth, setIsAuth] = useState([]);

  let token= auth.getToken();

  // useEffect(() => {
  //   sendHttpRequest('GET', '/api/guest/verify?token=' + token)
  //   .then(responseData => {
  //       if(!responseData.success) {
  //         setIsAuth(false);
  //       } else {
  //          setIsAuth(true);
  //       }
  //   })
  //   .catch(err => {
  //       console.log(err);
  //       return <Redirect to="/404"/>;
  //   });
  // });


  if (token) {
    // if(!isAuth) {
    //   return <Redirect to="/404"/>;
    // }else {
      return (
        <div>
          <Navigation/>
          {props.children}
        </div>
      );
    // }
  } else {
    return <Redirect to="/"/>;
  }
}

export default UserRoot;
