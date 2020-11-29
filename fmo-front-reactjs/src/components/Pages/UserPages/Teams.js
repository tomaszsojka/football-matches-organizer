import React from "react";

 import "./Teams.css";
import {sendHttpRequest} from "../../../Fetch/useFetch";
import auth from "../../../Auth";

import {TeamsList} from "./TeamsList";


export class Teams extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teams : []
        };
    }


    componentDidMount() {
        sendHttpRequest('GET', '/api/user/teams').then(responseData => {
            this.setState({
                teams : responseData
            });
        });
    }

    render() {
        return (
                <div className="main-container central-container">             
                    <div className="boxContainer">
                        <div className="boxContainer-header bottomBorder">
                            Teams
                        </div>
                        <TeamsList teams={this.state.teams} />
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