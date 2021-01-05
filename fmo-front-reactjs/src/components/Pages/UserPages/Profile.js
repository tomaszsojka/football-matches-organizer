import React from "react";
import {connect} from "react-redux";
import {ToastsContainer, ToastsStore} from 'react-toasts';

import "./Profile.css";

import sendHttpRequest from "../../../Fetch/useFetch";
import InviteList from "../../Lists/InviteList";

import { setUserId } from "../../../store/actions/authActions";
import {logout} from "../../../store/actions/authActions";


class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name : "",
            email : "", 
            teamInvites : [{}]
        };
    }

    componentDidMount() {
        console.log(this.props.auth);
        sendHttpRequest('GET', '/api/user/profileData?token=' + this.props.auth.token)
        .then(responseProfileData => {
            if(!responseProfileData.success) {
                ToastsStore.error(`${responseProfileData.message}`);
            } else {
                this.setState({
                    name: responseProfileData.name,
                    email: responseProfileData.email,
                    teamInvites: responseProfileData.teamInvites
                });
                sendHttpRequest('GET', '/api/user/getUserId?token=' + this.props.auth.token)
                .then(responseUserId => {
                    if(!responseUserId.success) {
                        ToastsStore.error(`${responseUserId.message}`);
                    } else {
                        this.props.setUserId(responseUserId.userId);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
                
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    joinTeam(invite) {
        sendHttpRequest('PUT', '/api/user/acceptInviteTeam', {teamId : invite.teamId, userId : this.props.auth.userId})
        .then(responseData => {
            console.log(responseData);
            if(!responseData.success) {
                ToastsStore.error(`${responseData.message}`);
            } else {
                window.location.reload();
            }
            console.log(responseData.message);
        })
        .catch(err => {
            console.log(err);
        });
    }

    deleteInvite(invite) {
        sendHttpRequest('DELETE', '/api/user/deleteInviteTeam', {teamId : invite.teamId, userId : this.props.auth.userId})
        .then(responseData => {
            console.log(responseData);
            if(!responseData.success) {
                ToastsStore.error(`${responseData.message}`);
            } else {
                window.location.reload();
            }
            console.log(responseData.message);
        })
        .catch(err => {
            console.log(err);
        });
    }

    submitLogout() {

        // TODO delete this later 
        this.props.logout();
        //Refresh page if logout success
        window.location.reload();
        sendHttpRequest('GET', '/api/user/logout?token=' + this.props.auth.token)
        .then(responseData => {

            if(!responseData.success) {
                ToastsStore.error(`${responseData.message}`);
            } else {
                //clean localStorage
                //clean redux storage
                this.props.logout();
                //Refresh page if logout success
                window.location.reload();
            }
            console.log(responseData.message);
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {

        return (
            <div className="main-container profile-container central-container ">
                
                <div className="boxContainer">
                    <div className="boxContainer-header bottomBorder">
                        PROFILE
                    </div>
                    <div className="flex profileBox bottomBorder">
                        <img src="../Images/PROFILE.svg" alt="prof" className="user-image profile-image"/>
                        
                        <div className="flex profileData">
                            <div className="profileData-placehold">Name:</div>
                            <div className="flex profileData-content">
                                <div className="textWrap profileData-text">{this.state.name}</div>
                                <div/>
                            </div>
                            
                        </div>
                        <div className="flex profileData">
                            <div className="profileData-placehold">Email:</div>
                            <div className="flex profileData-content">
                                <div className="textWrap profileData-text">{this.state.email}</div>
                                <div/>
                            </div>
                        </div>
                        <div className="flex profileData">
                            <div className="profileData-placehold">Password:</div>
                            <div className="flex profileData-content">
                                <div className="textWrap profileData-text">******</div>
                                <button type="button" className="greyBtn editBtn">
                                    Edit
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="boxContainer-header">TEAM INVITATIONS</div>
                    <InviteList 
                    teamInvites={this.state.teamInvites} 
                    inviteReason={"you to join"}
                    boxStyle={"flex profileBox"}
                    onAcceptInvite={(invite) => this.joinTeam(invite)} 
                    onDeleteInvite={(invite) => this.deleteInvite(invite)}/>
                    <button type="button" className="greenBtn logoutBtn" onClick={() => this.submitLogout()}>Logout</button>
                        
                </div>
                
                <ToastsContainer store={ToastsStore}/>
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
        logout : () => {
            dispatch(logout());
        },
        setUserId : (userId) => {
            dispatch(setUserId(userId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Profile);