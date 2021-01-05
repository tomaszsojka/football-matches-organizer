import React from "react";
import "./GuestPage.css";
import sendHttpRequest from "../../../Fetch/useFetch";

import {Redirect} from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../../../store/actions/authActions";
import { setTeamsList} from "../../../store/actions/teamsActions";

import AddDocForm from "../../Forms/AddDocForm";
import {ToastsContainer, ToastsStore} from 'react-toasts';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputs : {
                email : {type : "email", value : "", placeholder : "email", errors : []},
                password : {type : "password", value : "", placeholder : "password", errors : []}
            }
        };
    }

    submitLogin(formData) {
            sendHttpRequest('POST', '/api/guest/login', formData)
                .then(responseData => {
                    if(!responseData.success) {
                        // this.setState((prevState) =>({
                        //         ...prevState,
                        //         inputs : {
                        //             email : {...prevState["inputs"].email},
                        //             password : {
                        //                 ...prevState["inputs"].password,
                        //                 errors : [responseData.message]
                        //             }
                        //         }
                        //     })  
                        // );
                        ToastsStore.error(`${responseData.message}`);
                        // this.showValidationErr("email", responseData.message);
                    } else {
                        this.props.login(responseData.token, responseData.userId);

                        
                        sendHttpRequest('GET', '/api/user/teams?token=' + responseData.token)
                        .then(responseData => {
                            if(!responseData.success) {
                                ToastsStore.error(`${responseData.message}`);
                            } else {
                                this.props.loadUserTeams(responseData.teams);
                            }
                        })
                        .catch(err => {
                            ToastsStore.error("Server error");
                            console.log(err);
                        });
                    }
                })
                .catch(err => {
                    ToastsStore.error("Server error");
                    console.log(err);
                });
    }

    render() {

        return(
            <div>
                <AddDocForm 
                title="LOGIN" 
                inputs={this.state.inputs}
                onSubmitForm={(formData) => this.submitLogin(formData)}
                />
                <ToastsContainer store={ToastsStore}/>
            </div>
        ); 
     
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.authReducer,
        teams : state.teamsReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (token, userId) => {
            dispatch(login(token, userId));
        },
        loadUserTeams: (teams) => {
            dispatch(setTeamsList(teams));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Login);
