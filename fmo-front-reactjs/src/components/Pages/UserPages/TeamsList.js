import React from "react";
import "./Teams.css"


export const TeamsList = (props) => {
    return (
        <div  className="flex teamsBox bottomBorder">
            {/* key added because of error */}
            {props.teams.map((team) => 
                <div className="flex teamBtn greyBtn">
                    <img src="../Images/vestra.jpg" alt="team logo" className="team-image teamsItem-image"/>
                    <div className="teamTitle">{team.name}</div> 
                    <img src="../Images/captainSign.png" alt="captain sign" className="user-image captainSign-image"/>
                </div>
            )}
        </div>
    );
}