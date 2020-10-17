import React from "react";

import "./AccessAccount.css";
import {Login} from "../../Forms/Login";
import {AddAccountForm} from "../../Forms/AddAccountForm";


export class AccessAccount extends React.Component {

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
            <div className="container">
                <div className="mainContainer">
                    <hr/>
                    <div className="boxController">
                        <div className={"controller" + (this.state.isLoginOpen ? " selectedController" : "")}
                             onClick={this.showLoginBox.bind(this)}>
                            Login
                        </div>
                        <div className={"controller" + (this.state.isRegisterOpen ? " selectedController" : "")}
                             onClick={this.showRegisterBox.bind(this)}>
                            Register
                        </div>
                    </div>
                    <div className="boxContainer">
                        {this.state.isLoginOpen && <Login/>}
                        {this.state.isRegisterOpen && <AddAccountForm title="Register" userRole="client" submitRedirect={this.showLoginBox.bind(this)}/>}

                    </div>
                </div>
            </div>
        );
    }
}