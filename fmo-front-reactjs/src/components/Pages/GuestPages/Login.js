import React from "react";
import "./AccessAccount.css";
import {sendHttpRequest} from "../../../Fetch/useFetch";

import auth from "../../../Auth";
import {Redirect} from "react-router-dom";

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password: "",
            errors: [],
            role: "",
            token: null
        };
    }

    showValidationErr(elm, msg) {
        this.setState((prevState) => ({
                errors: [
                    ...prevState.errors,
                    {elm, msg}
                ]
            })
        );
    }

    clearValidationErr(elm) {
        this.setState((prevState) => {
            let newArr = [];
            for(let err of prevState.errors) {
                if(elm !== err.elm) {
                    newArr.push(err);
                }
            }
            return {errors: newArr};
        });
    }

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        });
        this.clearValidationErr("password");

    }

    onEmailChange(e) {
        this.setState({
            email: e.target.value
        });
        this.clearValidationErr("email");

    }


    submitLogin(e) {
        let isError = false;
        if(this.state.email === "") {
            this.showValidationErr("email", "Email address cannot be empty");
            isError = true;
        }else if(this.state.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)==null) {
            this.showValidationErr("email", "Email is not valid")
            isError = true;
        }
        if(this.state.password === "") {
            this.showValidationErr("password", "Password cannot be empty");
            isError = true;
        }

        if(isError === false) {
            sendHttpRequest('POST', '/api/guest/login', this.state)
                .then(responseData => {
                    if(!responseData.success) {
                        this.showValidationErr("email", responseData.message);
                    } else {
                        var tmpRole = 'U';
                        auth.login(responseData.token, tmpRole);
                        this.setState({
                            token: responseData.token,
                            role: tmpRole 
                        });
                    }
                })
                .catch(err => {
                    this.showValidationErr("email", "Server error");
                    console.log(err);
                });
        }
    }

    render() {

        let emailErr = null, passwordErr = null;
        let role = this.state.role;
        let token = this.state.token;

        for(let err of this.state.errors) {
            if(err.elm === "email") {
                emailErr = err.msg;
            }
            if(err.elm === "password") {
                passwordErr = err.msg;
            }
        }
        if (token && role === 'U') {
            // window.location.reload(false);
             return <Redirect to='/user'/>;
        }

        return (
            <div >
                <div className="header">
                    Login
                </div>
                <div className="box">

                    <div className="inputGroup">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="loginInput"
                            placeholder="Email"
                            onChange={this.onEmailChange.bind(this)}
                        />
                        <small className="passingError">{ emailErr ? emailErr : "" }</small>
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="loginInput"
                            placeholder="Password"
                            onChange={this.onPasswordChange.bind(this)}
                        />
                        <small className="passingError">{ passwordErr ? passwordErr : "" }</small>
                    </div>

                    <button
                        type="button"
                        className="loginBtn"
                        onClick={this.submitLogin.bind(this)}>Login</button>
                </div>
            </div>
        );
    }

}