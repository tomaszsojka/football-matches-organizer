import React from "react";

import "../Posts.css";

import MainPosts from "../MainPosts";
import TeamSideBar from "./TeamSideBar";

import sendHttpRequest from "../../../../Fetch/useFetch";
import {ToastsContainer, ToastsStore} from 'react-toasts';

class TeamPosts extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            teamId: window.location.href.substring(window.location.href.lastIndexOf('/') + 1),
            posts: []
        };
    }

    componentDidMount() {
        sendHttpRequest('GET', '/api/user/posts?teamId=' + this.state.teamId)
        .then(responseData => {
            if(!responseData.success) {
                ToastsStore.error(`${responseData.message}`);
            } else {
                console.log(responseData.message);
                this.setState({posts : responseData.posts});
            }
        })
        .catch(err => {
            ToastsStore.error("Server error");
            console.log(err);
        });
    }

    render() {
        console.log(this.state.posts);
        return (
            <div className="flex main-container posts-container posts-container-flex">
                <MainPosts posts={this.state.posts} />
                <TeamSideBar sideBlocks={[{title : "CALENDAR", content : ""}]}/>
                <ToastsContainer store={ToastsStore}/>
            </div>
        );
    }
}

export default TeamPosts;