import React from "react";
import "./GuestPage.css";
import sendHttpRequest from "../../../Fetch/useFetch";

import {Redirect} from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../../../store/actions/authActions";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password: "",
            errors: []
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
                        this.props.login(responseData.token, responseData.userId);
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
        let token = this.props.auth.token;

        for(let err of this.state.errors) {
            if(err.elm === "email") {
                emailErr = err.msg;
            }
            if(err.elm === "password") {
                passwordErr = err.msg;
            }
        }
        if (token) {
            // window.location.reload(false);
             return <Redirect to='/user'/>;
        }

        return (
            <div className="boxContainer">
                <div className="boxContainer-header bottomBorder">
                    Login
                </div>
                <div className="flex box">

                    <div className="flex inputGroup">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="formInput"
                            placeholder="Email"
                            onChange={this.onEmailChange.bind(this)}
                        />
                        <small className="passingError">{ emailErr ? emailErr : "" }</small>
                    </div>

                    <div className="flex inputGroup">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="formInput"
                            placeholder="Password"
                            onChange={this.onPasswordChange.bind(this)}
                        />
                        <small className="passingError">{ passwordErr ? passwordErr : "" }</small>
                    </div>

                    <button
                        type="button"
                        className="greenBtn formBtn"
                        onClick={this.submitLogin.bind(this)}>Login</button>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (token, userId) => {
            dispatch(login(token, userId));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Login);
