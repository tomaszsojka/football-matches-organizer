import React from "react";
import "./GuestPage.css"
import {sendHttpRequest} from "../../../Fetch/useFetch"

/**
 * class for register and adding accounts by admin
 */
export class AddAccountForm extends React.Component {
//TODO if we have time password strength bar
    constructor(props) {
        super(props);
        this.state = {
            name: "",
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

    onNameChange(e) {
        this.setState({
            name: e.target.value
        });
        this.clearValidationErr("name");
    }

    onEmailChange(e) {
        this.setState({
            email: e.target.value
        });
        this.clearValidationErr("email");

    }

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        });
        this.clearValidationErr("password");

    }

    submitAddAccount(e) {
        let isError = false;
        if(this.state.name === "") {
            this.showValidationErr("name", "Name cannot be empty");
            isError = true;
        }
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
            //TODO check if its ok
            console.log("User data is ok");

            var userRole = this.props.userRole;
            var path;
            if(userRole === "user") {
                path = '/api/guest/register';
            }
            sendHttpRequest('POST', path, this.state)
                .then(responseData => {
                    console.log(responseData);
                    if(!responseData.success) {
                        this.showValidationErr("email", responseData.message);
                    } else {
                        //if redirecting function is not passed as a prop variable is null
                        let submitRedirect = this.props.submitRedirect || null;
                        if(submitRedirect) {
                            this.props.submitRedirect();
                        }
                    }
                })
                .catch(err => {
                    this.showValidationErr("password", " Server error");
                    console.log(err, err.data);
                });
        }
    }

    render() {

        let nameErr = null, emailErr = null, passwordErr = null;

        for(let err of this.state.errors) {
            if(err.elm === "name") {
                nameErr = err.msg;
            }
            if(err.elm === "email") {
                emailErr = err.msg;
            }
            if(err.elm === "password") {
                passwordErr = err.msg;
            }
        }

        return (
            <div className="boxContainer">
                <div className="boxContainer-header bottomBorder">
                    {this.props.title}
                </div>
                <div className="flex box">

                    <div className="flex inputGroup">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="loginInput"
                            required
                            placeholder="First and second name"
                            onChange={this.onNameChange.bind(this)}
                        />
                        <small className="passingError">{ nameErr ? nameErr : "" }</small>
                    </div>

                    <div className="flex inputGroup">
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

                    <div className="flex inputGroup">
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
                        className="greenBtn loginBtn"
                        onClick={this.submitAddAccount.bind(this)}>{this.props.title}</button>
                </div>
            </div>
        );
    }
}