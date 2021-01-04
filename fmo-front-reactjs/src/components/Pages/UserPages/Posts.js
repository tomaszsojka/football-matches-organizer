import React from "react";

import "./Posts.css";

import MainPosts from "./MainPosts";
import SideBar from "./SideBar";

import sendHttpRequest from "../../../Fetch/useFetch";
import {ToastsContainer, ToastsStore} from 'react-toasts';

class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        sendHttpRequest('GET', '/api/user/posts')
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
        return (
            <div className="flex main-container posts-container posts-container-flex">
                <MainPosts posts={this.state.posts} />
                <SideBar/> {/*  sideBlocks={[{title : "CALENDAR", content : ""}]} */}
                <ToastsContainer store={ToastsStore}/>
            </div>
        );
    }
}

export default Posts;