import React from "react";
import "../Posts.css";
import AddDocForm from "../../../Forms/AddDocForm";

import sendHttpRequest from "../../../../Fetch/useFetch";
import {ToastsContainer, ToastsStore} from 'react-toasts';
import { Link } from "react-router-dom";


const TeamSideBar = (props) => {
    const containerStyle = "sidebar-widget";
    const inputs = {
        email : {type : "text", value : "", placeholder : "New player's email", errors : []}
    };
    const submitInvite = (formData) => {
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
    return (
        <aside className="sidebar ">
            {/* {props.sideBlocks.map((block, i) => */}
            <Link to={`/user/teams/${window.location.href.substring(window.location.href.lastIndexOf('/') + 1)}/calendar`}>
                <div className="sidebar-widget">
                    <h4 className="widget-title bottomBorder">CALENDAR</h4>
                    <img src="/Images/Calendar.jpg" alt="" className="widget-image"/>
                {/* <p className="widget-body">{block.content}</p> */}
                </div>
            </Link>
            {/* )} */}
            {/* <div className="sidebar-widget"> */}
                {/* <h4 className="widget-title bottomBorder">CALENDAR</h4> */}
                { props.isCaptain && <AddDocForm 
                        title="Invite user to the group" 
                        containerStyle={containerStyle}
                        inputs={inputs}
                        onSubmitForm={(formData) => submitInvite(formData)}
                        style={{marginBottom : "5em"}}
                        />}
            {/* </div> */}
            <ToastsContainer store={ToastsStore}/>
        </aside>
    );
}

export default TeamSideBar;