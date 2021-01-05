import React from "react";
import "../Posts.css";
import { Link } from "react-router-dom";
import {ToastsContainer, ToastsStore} from 'react-toasts';

import sendHttpRequest from "../../../../Fetch/useFetch";
import AddDocForm from "../../../Forms/AddDocForm";
import InviteList from "../../../Lists/InviteList"; 


class TeamSideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            containerStyle : "sidebar-widget",
            inputs : {
                email : {type : "text", value : "", placeholder : "New player's email", errors : []}
            }
        };
        this.submitMemberInvite = this.submitMemberInvite.bind(this);
        this.acceptMatchInvite = this.acceptMatchInvite.bind(this);
        this.deleteMatchInvite = this.deleteMatchInvite.bind(this);
    }
    submitMemberInvite(formData) {
        console.log(formData);
        console.log("SENDING INVITATION");
        const req = {
            teamId: window.location.href.substring(window.location.href.lastIndexOf('/') + 1),
            email : formData.email
        };
        sendHttpRequest('POST', "/api/user/send-invite", req)
            .then(responseData => {
                if(!responseData.success) {
                    ToastsStore.error(`${responseData.message}`);
                } else {

                    ToastsStore.success(`${responseData.message}`);
                }
            })
            .catch(err => {
                ToastsStore.error("Server error");
                console.log(err, err.data);
            });
    };

    acceptMatchInvite(invite) {
        sendHttpRequest('PUT', '/api/user/acceptInviteMatch', {...invite, invitedTeamId : this.props.teamId})
        .then(responseData => {
            console.log(responseData);
            if(!responseData.success) {
                ToastsStore.error(`${responseData.message}`);
            } else {
                ToastsStore.success(`${responseData.message}`);
                setTimeout(() => ToastsStore.info("Appointment is being added to the calendar"), 3000);
                setTimeout(() => window.location.reload(), 6000);
            }
            console.log(responseData.message);
        })
        .catch(err => {
            console.log(err);
        });
    }

    deleteMatchInvite(invite) {
        sendHttpRequest('DELETE', '/api/user/deleteInviteMatch', {...invite, invitedTeamId : this.props.teamId})
        .then(responseData => {
            console.log(responseData);
            if(!responseData.success) {
                ToastsStore.error(`${responseData.message}`);
            } else {
                ToastsStore.success(`${responseData.message}`);
                setTimeout(() => window.location.reload(), 3000);
            }
            console.log(responseData.message);
        })
        .catch(err => {
            console.log(err);
        });
    }
    render() {
        return (
            <aside className="sidebar ">
                <Link to={`/user/teams/${window.location.href.substring(window.location.href.lastIndexOf('/') + 1)}/calendar`}>
                    <div className="sidebar-widget">
                        <h4 className="widget-title bottomBorder">CALENDAR</h4>
                        <img src="/Images/Calendar.jpg" alt="" className="widget-image"/>
                    </div>
                </Link>
                { this.props.isCaptain && <div className="sidebar-widget">
                        <h4 className="widget-title bottomBorder">TEAM INVITES FOR A MATCH</h4>
                        <InviteList 
                        teamInvites={this.props.matchInvites} 
                        inviteReason={"your team for the match:"}
                        // boxStyle={"flex "}
                        invitationStyle={"flex matchInvite-content teamInvitation"}
                        imageStyle={"matchInvite-image"}
                        onAcceptInvite={(invite) => this.acceptMatchInvite(invite)} 
                        onDeleteInvite={(invite) => this.deleteMatchInvite(invite)}/>
                    </div>}
                { this.props.isCaptain && <AddDocForm 
                    title="INVITE USER TO THE GROUP" 
                    containerStyle={this.state.containerStyle}
                    inputs={this.state.inputs}
                    onSubmitForm={(formData) => this.submitMemberInvite(formData)}
                    style={{marginBottom : "5em"}}
                />}
                <ToastsContainer store={ToastsStore}/>
            </aside>
        );
    }
}

export default TeamSideBar;