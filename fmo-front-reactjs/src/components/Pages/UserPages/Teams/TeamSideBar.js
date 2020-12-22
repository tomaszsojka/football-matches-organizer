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

    }

    deleteMatchInvite(invite) {

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
                        teamInvites={[{name : "Olimpia Grudziądz", startDate: "2020-12-25T12:30", endDate: "2020-12-25T14:30"}, {name : "Olimpia Grudziądz", startDate: "2020-12-25T12:30", endDate: "2020-12-25T14:30"}]} 
                        inviteReason={"your team for the match:"}
                        // boxStyle={"flex "}
                        invitationStyle={"flex matchInvite-content teamInvitation"}
                        imageStyle={"matchInvite-image"}
                        onAcceptInvite={(invite) => this.acceptMatchInvite(invite)} 
                        onDeleteInvite={(invite) => this.deleteMatchInvite(invite)}/>
                    </div>}
                { this.props.isCaptain && <AddDocForm 
                    title="Invite user to the group" 
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