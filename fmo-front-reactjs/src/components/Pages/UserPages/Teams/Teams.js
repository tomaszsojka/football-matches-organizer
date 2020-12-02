import React from "react";

 import "./Teams.css";
import sendHttpRequest from "../../../../Fetch/useFetch";

import {TeamsList} from "./TeamsList";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { setTeamsList} from "../../../../store/actions/teamsActions";


class Teams extends React.Component {

    componentDidMount() {
        console.log(this.props);
        let tok = this.props.auth.token;
        sendHttpRequest('GET', '/api/user/teams?token=' + tok).then(responseData => {
            this.props.loadTeamsList(responseData.teams);
            console.log(this.props.teams.teams);
        });
    }

    render() {
        console.log(this.props.teams.teams);
        return (
            <div className="main-container central-container">             
                <div className="boxContainer">
                    <div className="boxContainer-header bottomBorder">
                        Teams
                    </div>
                    <TeamsList teams={this.props.teams.teams} userId={this.props.auth.userId}/>
                    <div className="flex teamsBox">
                        <Link to={"/user/teams/add-team"}>
                            <button className="teamBtn addTeamBtn" >
                                <div className="teamTitle">Add new team</div>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>    
        );
    }
}

const mapStateToProps = (state) => {
    return {
        teams: state.teamsReducer,
        auth: state.authReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTeamsList: (teams) => {
            dispatch(setTeamsList(teams));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Teams);
