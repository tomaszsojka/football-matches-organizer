import React from "react";
import "./Teams.css";


export const TeamsList = (props) => {
    
    return (
        <div  className="flex teamsBox bottomBorder">
            {/* key added because of error */}
            {props.teams.map((team) => 
                <button key={team._id} className="flex teamBtn greyBtn" onClick={() => props.onTeamClick()}>
                    <img src="../Images/vestra.jpg" alt="team logo" className="team-image teamsItem-image"/>
                    <div className="teamTitle">{team.name}</div> 
                    {/* if user is captain of a team show " C " sign on button, if not empty object*/}
                    {props.userId === team.captainId ? <img src="../Images/captainSign.png" alt="captain sign" className="user-image captainSign-image"/> : <div className="captainSign-image"></div>}
                </button>
            )}
        </div>
    );
}