import React from "react";
import "./Toolbar/Toolbar";
import Toolbar from "./Toolbar/Toolbar";

import "./Navigation.css"

export class Navigation extends React.Component {

    state = {
        open: false,
        name: ""
    };

    makeBackgroundDarker(isOpen) {
        this.setState(() => {   
            if(isOpen) {
                return {
                    open: isOpen,
                    name: "dropDownMenuOn"
                };
            } else {
                return {
                    open: isOpen,
                    name: ""
                };
            }
        });
    }

    render() {
        return(
                <div >
                    <Toolbar isOpen={this.state.open} dropDownMenuClickHandler={(isOpen) =>this.makeBackgroundDarker(isOpen)}/>
                    {/* when clicked out of toolbar, drop menu is closing */}
                    <div className={this.state.name} onClick={() => {
                        this.setState({
                            open: false,
                            name: ""
                        });
                    }}>
                    </div>
                    {/* TODO add footer */}
                </div>
        );
}
}
export default Navigation;

