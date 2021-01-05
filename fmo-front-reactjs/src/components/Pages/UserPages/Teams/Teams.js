import React from "react";

 import "./Teams.css";
import sendHttpRequest from "../../../../Fetch/useFetch";

import TeamsList from "./TeamsList";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { setTeamsList} from "../../../../store/actions/teamsActions";
import {ToastsContainer, ToastsStore} from 'react-toasts';
import { setUserId } from "../../../../store/actions/authActions";


class Teams extends React.Component {

    componentDidMount() {
        let tok = this.props.auth.token;
        sendHttpRequest('GET', '/api/user/teams?token=' + tok)
        .then(responseTeams => {
            if(!responseTeams.success) {
                ToastsStore.error(`${responseTeams.message}`);
            } else {
                sendHttpRequest('GET', '/api/user/getUserId?token=' + tok)
                .then(responseUserId => {
                    if(!responseUserId.success) {
                        ToastsStore.error(`${responseUserId.message}`);
                    } else {
                        this.props.loadTeamsListAndUserId(responseTeams.teams, responseUserId.userId);
                    }
                })
                .catch(err => {
                    ToastsStore.error("Server error");
                    console.log(err);
                });
            }
        })
        .catch(err => {
            ToastsStore.error("Server error");
            console.log(err);
        });
    }

    render() {
        console.log(this.props.auth);
        return (
            <div className="main-container central-container">             
                <div className="boxContainer">
                    <div className="boxContainer-header bottomBorder">
                        TEAMS
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
                <ToastsContainer store={ToastsStore}/>
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
        loadTeamsListAndUserId: (teams, userId) => {
            dispatch(setTeamsList(teams));
            dispatch(setUserId(userId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Teams);
