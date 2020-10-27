import React, {useState, useEffect} from "react";

import "./Posts.css";

import {MainPosts} from "./MainPosts";
import {SideBar} from "./SideBar";

import {sendHttpRequest} from "../../../Fetch/useFetch";

export function Posts() {
    
    const [data, setData] = useState([]);

    useEffect(() => {
        sendHttpRequest('GET', '/api/posts').then(responseData => {
            setData(responseData);
            console.log(responseData);
        });
    }, []);

    return (
        <div className="main-container posts-container posts-container-flex">
            <MainPosts posts={data} />
            <SideBar/>
        </div>
    );
}

// export default Posts;