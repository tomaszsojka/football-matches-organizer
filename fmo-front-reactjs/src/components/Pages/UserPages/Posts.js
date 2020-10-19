import React from "react";

import "./Posts.css";

import {MainPosts} from "./MainPosts";
import {SideBar} from "./SideBar";

export const Posts = (props) => {

    return (
        <div className="main-container posts-container posts-container-flex">
            <MainPosts/>
            <SideBar/>
        </div>
    );
}

// export default Posts;