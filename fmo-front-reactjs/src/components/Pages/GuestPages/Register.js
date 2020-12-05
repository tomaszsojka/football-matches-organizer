import React from "react";
import "./GuestPage.css";
import sendHttpRequest from "../../../Fetch/useFetch";
import {ToastsContainer, ToastsStore} from 'react-toasts';

import AddDocForm from "../../Forms/AddDocForm";

/**
 * class for register and adding another documents to db like teams
 */
class Register extends React.Component {
//TODO if we have time password strength bar
    constructor(props) {
        super(props);
        this.state = {
            inputs : {
                name : {type : "text", value : "", placeholder : "first and second name", errors : []},
                email : {type : "email", value : "", placeholder : "email", errors : []},
                password : {type : "password", value : "", placeholder : "password", errors : []}
            }
        };
    }

    submitRegister(formData) {    
       console.log("REGISTER");

        sendHttpRequest('POST', '/api/guest/register', formData)
            .then(responseData => {
                console.log(responseData);
                if(!responseData.success) {
                    ToastsStore.error(`${responseData.message}`);
                } else {
                    //if redirecting function is not passed as a prop variable is null
                    let submitRedirect = this.props.submitRedirect || null;
                    if(submitRedirect) {
                        this.props.submitRedirect();
                    }
                }
            })
            .catch(err => {
                ToastsStore.error("Server error");
                console.log(err, err.data);
            });
    }

    render() {
        return(
            <div>
                <AddDocForm 
                title="Register" 
                inputs={this.state.inputs}
                onSubmitForm={(formData) => this.submitRegister(formData)}
                />
                <ToastsContainer store={ToastsStore}/>
            </div>
        );
    }
}

export default Register;