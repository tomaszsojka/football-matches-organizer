import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({component: Component, auth, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (1) {
                    return <Component {...props} />;
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
