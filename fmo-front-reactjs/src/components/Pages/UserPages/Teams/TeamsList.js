import React from "react";
import {Link} from "react-router-dom"
import "./Teams.css";


const TeamsList = (props) => {

    function getAllIndexes(arr, val) {
        var indexes = [], i = -1;
        while ((i = arr.indexOf(val, i+1)) !== -1){
            indexes.push(i);
        }
        return indexes;
    }
    
    return (
        <div  className="flex teamsBox bottomBorder">
            {/* key added because of error */}
            {props.teams.map((team) => {
                let idxOfWhitespace = getAllIndexes(team.name, ' ');
                // /user/teams/${team.name.replace(/\s/g, "")}.${idxOfWhitespace.toString().replace(/,/g, ".")}
                console.log(idxOfWhitespace);
                return <Link to={`/user/teams/${team._id}`} key={team._id}>
                    <button className="flex teamBtn greyBtn">
                        <img src="../Images/vestra.jpg" alt="team logo" className="team-image teamsItem-image"/>
                        <div className="teamTitle">{team.name}</div> 
                        {/* if user is captain of a team show " C " sign on button, if not empty object*/}
                        {props.userId === team.captainId ? <img src="../Images/captainSign.png" alt="captain sign" className="user-image captainSign-image"/> : <div className="captainSign-image"></div>}
                    </button>
                </Link>
            }
            )}
        </div>
    );
}
export default TeamsList;