import React from "react";

import "./Profile.css";

const ProfileInviteList = (props) => {
    return (
        <div className="flex profileBox">
            {props.teamInvites.map((invite,i)  => 
                <div key={i} className="flex teamInvitation">
                    <img src="../Images/vestra.jpg" alt="profile logo" className="team-image invite-image"/>
                    <div className="inviteContent">
                        <p>{`Team ${invite.name} is inviting you to join`}</p>
                        <div className="flex invite-buttons">
                            <div className="greyBtn editBtn">join</div>
                            <div className="greyBtn editBtn">delete</div>
                        </div>
                    </div>   
                </div>
            )}       
        </div>
    );
};

export default ProfileInviteList;
