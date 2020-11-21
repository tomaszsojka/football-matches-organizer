import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./../Auth";

const PrivateRoute = ({component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                // auth.logout();
                console.log(auth.getToken());
                if (auth.getToken()) {
                    return <Component {...props} >
                        {props.children}
                    </Component>;
                } else {
                    return (
                        <Redirect to={"/"}/>
                    );
                }
            }}
        />
    );
};

export default PrivateRoute;
