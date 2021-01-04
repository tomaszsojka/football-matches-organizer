import React from "react";
import {Redirect} from "react-router-dom";
import { connect } from "react-redux";  

import "../Posts.css";

import MainPosts from "../MainPosts";
import TeamSideBar from "./TeamSideBar";

import sendHttpRequest from "../../../../Fetch/useFetch";
import {ToastsContainer, ToastsStore} from 'react-toasts';
import { setUserId } from "../../../../store/actions/authActions";

class TeamPosts extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            teamId: window.location.href.substring(window.location.href.lastIndexOf('/') + 1),
            isCaptain: false,
            posts: [], 
            matchInvites: [],
            isRedirect : false
        };
    }

    componentDidMount() {
        sendHttpRequest('GET', '/api/user/posts?teamId=' + this.state.teamId)
        .then(responsePosts => {
            if(!responsePosts.success) {
                ToastsStore.error(`${responsePosts.message}`);
                this.setState({isRedirect: true});
            } else {
                console.log(responsePosts.message);
                sendHttpRequest('GET', '/api/user/getUserId?token=' + this.props.auth.token)
                .then(responseUserId => {
                    if(!responseUserId.success) {
                        ToastsStore.error(`${responseUserId.message}`);
                    } else {
                        this.props.setUserId(responseUserId.userId);
                        sendHttpRequest('GET', '/api/user/getTeamInfo?teamId=' + this.state.teamId)
                        .then(responseTeamInfo => {
                            if(!responseTeamInfo.success) {
                                ToastsStore.error(`${responseTeamInfo.message}`);
                            } else {
                                if(!responseTeamInfo.playersIds.includes(this.props.auth.userId)) {
                                    // here user is not a member of the team 
                                    this.setState({isRedirect: true});
                                } else {
                                    this.setState({posts : responsePosts.posts});
                                    if(responseTeamInfo.captainId === this.props.auth.userId) {
                                        this.setState({
                                            isCaptain : true,
                                            matchInvites : responseTeamInfo.matchInvites
                                        });
                                    }
                                }
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
        })
        .catch(err => {
            ToastsStore.error("Server error");
            this.setState({isRedirect: true});
            console.log(err);
        });
    }

    render() {
        if(this.state.isRedirect) {
            return <Redirect to={"/user/teams404"}/>
        } else {
            return (
                <div className="flex main-container posts-container posts-container-flex">
                    <TeamSideBar isCaptain={this.state.isCaptain} matchInvites={this.state.matchInvites} teamId={this.state.teamId}/>
                    <MainPosts posts={this.state.posts} />
                    <ToastsContainer store={ToastsStore}/>
                </div>
            );
        }
       
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUserId: (userId) => {
            dispatch(setUserId(userId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (TeamPosts);