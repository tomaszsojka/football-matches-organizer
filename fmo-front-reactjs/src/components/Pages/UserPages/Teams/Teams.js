import React from "react";

 import "./Teams.css";
import sendHttpRequest from "../../../../Fetch/useFetch";

import {TeamsList} from "./TeamsList";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { setTeamsList} from "../../../../store/actions/teamsActions";
import {ToastsContainer, ToastsStore} from 'react-toasts';


class Teams extends React.Component {

    componentDidMount() {
        let tok = this.props.auth.token;
        sendHttpRequest('GET', '/api/user/teams?token=' + tok)
        .then(responseData => {
            if(!responseData.success) {
                ToastsStore.error(`${responseData.message}`);
            } else {
                this.props.loadTeamsList(responseData.teams);
            }
        })
        .catch(err => {
            ToastsStore.error("Server error");
            console.log(err);
        });
    }

    render() {
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
        loadTeamsList: (teams) => {
            dispatch(setTeamsList(teams));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Teams);
