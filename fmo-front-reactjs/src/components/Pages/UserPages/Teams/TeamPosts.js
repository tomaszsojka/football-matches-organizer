import React, {useState, useEffect} from "react";

import "../Posts.css";

import {MainPosts} from "../MainPosts";
import {SideBar} from "../SideBar";

import {sendHttpRequest} from "../../../../Fetch/useFetch";

export function TeamPosts() {
    
    const [data, setData] = useState([]);

    useEffect(() => {
        sendHttpRequest('GET', '/api/user/posts').then(responseData => {
            setData(responseData);
        });
    }, []);

    return (
        <div className="flex main-container posts-container posts-container-flex">
            <MainPosts posts={data} />
            <SideBar/>
        </div>
    );
}

// export default Posts;