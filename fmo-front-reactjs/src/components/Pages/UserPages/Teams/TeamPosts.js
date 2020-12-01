import React from "react";

import "../Posts.css";

import MainPosts from "../MainPosts";
import SideBar from "../SideBar";

import sendHttpRequest from "../../../../Fetch/useFetch";

class TeamPosts extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        sendHttpRequest('GET', '/api/user/posts').then(responseData => {
            this.setState({data : responseData});
        });
    }

    render() {
        return (
            <div className="flex main-container posts-container posts-container-flex">
                <MainPosts posts={this.state.data} />
                <SideBar/>
            </div>
        );
    }
}

export default TeamPosts;