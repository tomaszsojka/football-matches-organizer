import React from "react";
import "../../GuestPages/GuestPage.css";
import { Redirect } from "react-router-dom";

import sendHttpRequest from "../../../../Fetch/useFetch";
import {ToastsContainer, ToastsStore} from 'react-toasts';

import { connect } from "react-redux";

import AddDocForm from "../../../Forms/AddDocForm";


class AddTeam extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRedirect : false,
            inputs : {
                name : {type : "text", value : "", placeholder : "name of the new team", errors : []},
                location : {type : "text", value : "", placeholder : "team region / city", errors : []}
            }
        };
    }
    
    submitAddTeam(formData) {
        console.log("ADDING NEW TEAM");
        const req = {
            token : this.props.auth.token,
            ...formData
        };
        sendHttpRequest('POST', "/api/user/add-team", req)
            .then(responseData => {
                if(!responseData.success) {
                    ToastsStore.error(`${responseData.message}`);
                } else {
                    this.setState({
                        isRedirect : true
                    });
                }
            })
            .catch(err => {
                ToastsStore.error("Server error");
                console.log(err, err.data);
            });
    }

    render() {
        if(this.state.isRedirect) {
            return <Redirect to={"/user/teams"}/>;
        } else {
            return(
                <div className="main-container central-container">
                    <AddDocForm 
                    title="Add New Team" 
                    inputs={this.state.inputs}
                    onSubmitForm={(formData) => this.submitAddTeam(formData)}
                    />
                    <ToastsContainer store={ToastsStore}/>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        teams: state.teamsReducer,
        auth: state.authReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (AddTeam);