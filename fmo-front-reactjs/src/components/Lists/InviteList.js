import React from "react";

import "./InviteList.css";

const InviteList = (props) => {
    return (
        <div className={props.boxStyle ? props.boxStyle : "flex profileBox"}>
            {props.teamInvites.map((invite,i)  => {
                let day, startHour, endHour;
                if(invite.startDate) {
                    day = invite.startDate.substring(0, invite.startDate.indexOf('T'));
                    startHour = invite.startDate.substring(invite.startDate.indexOf('T') + 1);
                    endHour = invite.endDate.substring(invite.endDate.indexOf('T') + 1)
                }
                return (
                    <div key={i} className={props.invitationStyle ? props.invitationStyle :"flex teamInvitation"}>
                        <img src="/Images/vestra.jpg" alt="profile logo" className={props.imageStyle ? props.imageStyle : "team-image invite-image"}/>
                        <div className="inviteContent">
                            <p>{`Team ${invite.name} is inviting ${props.inviteReason}`}</p>
                            {invite.startDate ? 
                                <div className="flex invite-matchDate">
                                    <p>{day}</p>
                                    <div className="flex">
                                        <p>{startHour}</p>-<p>{endHour}</p>
                                    </div>
                                </div> 
                            : null}
                            <div className="flex invite-buttons">
                                <div className="greyBtn editBtn" onClick={() => props.onAcceptInvite(invite)}>join</div>
                                <div className="greyBtn editBtn" onClick={() => props.onDeleteInvite(invite)}>delete</div>
                            </div>
                        </div>   
                    </div>
                );
            }
            )}       
        </div>
    );
};

export default InviteList;
