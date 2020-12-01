import React from "react";

 import "./Teams.css";
import sendHttpRequest from "../../../../Fetch/useFetch";
import auth from "../../../../Auth";

import {TeamsList} from "./TeamsList";
import { Redirect } from "react-router-dom";


class Teams extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token : "",
            isRedirect: false,
            isAddTeamRedir: false,
            teams : [],
            userId : ""
        };
    }


    componentDidMount() {
        let tok = auth.getToken();
        sendHttpRequest('GET', '/api/user/teams?token=' + tok).then(responseData => {
            this.setState({
                teams : responseData.teams,
                userId : responseData.currentUserId,
                token : tok
            });
        });
    }

    teamRedirect() {
        this.setState({isRedirect : true});
    }

    addTeamRedirect() {
        this.setState({isAddTeamRedir : true});
    }

    render() {
        if(this.state.isRedirect) {
            return <Redirect to={"/"}/>;
        } else if(this.state.isAddTeamRedir) {
            return <Redirect to={"/user/teams/add-team"}/>;
        } else {
            return (
                <div className="main-container central-container">             
                    <div className="boxContainer">
                        <div className="boxContainer-header bottomBorder">
                            Teams
                        </div>
                        <TeamsList teams={this.state.teams} userId={this.state.userId} onTeamClick={() => this.teamRedirect()}/>
                        <div className="flex teamsBox">
                            <button className="teamBtn addTeamBtn" onClick={() => this.addTeamRedirect()}>
                                <div className="teamTitle">Add new team</div>
                            </button>
                        </div>
                    </div>
                </div>    
            );
        }

    }
}

export default Teams;