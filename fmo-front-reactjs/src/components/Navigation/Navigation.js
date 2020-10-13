import React from "react";
import "./Toolbar/Toolbar";
import Toolbar from "./Toolbar/Toolbar";

export class Navigation extends React.Component {
    render() {
            
        return(
                <div style={{height: "100%"}} >
                    <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
                </div>
        );
}
}
export default Navigation;

