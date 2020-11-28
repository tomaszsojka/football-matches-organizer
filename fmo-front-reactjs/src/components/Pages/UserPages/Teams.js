import React from "react";

 import "./Teams.css";
import {sendHttpRequest} from "../../../Fetch/useFetch"
import auth from "../../../Auth";


export class Teams extends React.Component {

    render() {

        return (
            <div className="main-container central-container">
                
                <div className="boxContainer">
                    <div className="boxContainer-header bottomBorder">
                        Teams
                    </div>
                    <div className="flex teamsBox bottomBorder">
                        <div className="flex teamBtn greyBtn">
                            <img src="../Images/vestra.jpg" alt="team logo" className="team-image teamsItem-image"/>
                            <div className="teamTitle">Vestra Vesteris</div> 
                        </div>
                        <div className="flex teamBtn greyBtn">
                            <img src="../Images/bayern.jpg" alt="team logo" className="team-image teamsItem-image"/>
                            <div className="teamTitle">Bayern Munich</div>
                        </div>
                    </div>
                    <div className="teamsBox">
                        <div className="teamBtn addTeamBtn">
                            <div className="teamTitle">Add new team</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}