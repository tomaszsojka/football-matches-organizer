import React from "react";

import "./Posts.css";

import {MainPosts} from "./MainPosts";
import {SideBar} from "./SideBar";

export const Posts = (props) => {

    return (
        <div className="container container-flex">
            <MainPosts/>
            <SideBar/>
            
        </div>
    );
}

// export default Posts;