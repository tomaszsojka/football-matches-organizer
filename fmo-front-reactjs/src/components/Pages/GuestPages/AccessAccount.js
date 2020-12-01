import React from "react";

import "./GuestPage.css";
import Login from "./Login";
import AddAccount from "./AddAccount";


class AccessAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isLoginOpen: true, isRegisterOpen: false };
    }

    showLoginBox() {
        this.setState({
            isLoginOpen: true,
            isRegisterOpen: false
        });
    }

    showRegisterBox() {
        this.setState({
            isRegisterOpen: true,
            isLoginOpen: false
        });
    }

    render() {
        return (
            <div className="accessAccount-container">
                <div className="flex boxController">
                    <div className={"controller" + (this.state.isLoginOpen ? " selectedController" : "")}
                            onClick={this.showLoginBox.bind(this)}>
                        Login
                    </div>
                    <div className={"controller" + (this.state.isRegisterOpen ? " selectedController" : "")}
                            onClick={this.showRegisterBox.bind(this)}>
                        Register
                    </div>
                </div>
                {this.state.isLoginOpen && <Login/>}
                {this.state.isRegisterOpen && <AddAccount title="Register" docType="user" submitRedirect={this.showLoginBox.bind(this)}/>}
            </div>
        );
    }
}

export default AccessAccount;