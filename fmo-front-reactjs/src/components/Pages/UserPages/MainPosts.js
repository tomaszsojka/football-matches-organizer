import React from "react";
import "./Posts.css";
import AddPost from "./AddPost";


const MainPosts = (props) => {

    const onKeyDown = (e) => {
        console.log("COMMENT");
        if (e.keyCode === 13) {
            onSubmitComment();
          }
    }
    const onSubmitComment = (e) => {
        console.log("SUBMIT COM");
    }


    return (
        
        <main role="main">
            
            <AddPost/>
            {/* key added because of error */}
            {props.posts.map((post) => 
            <article 
            onKeyDown={(e) => onKeyDown(e)} 
            tabIndex="0"
            key={post._id} 
            className="flex article-recent posts-container-flex">
                <div className="article-recent-main">
                    <h2 className="article-title">{post.title}</h2>
                    <p className="article-body">{post.content}</p>
                    <div className="flex posts-container-flex comment-container">
                        <img src="/Images/PROFILE.svg" alt="prof" className="user-image comment-image"/>
                        <input className="comment-input"></input>
                    </div>
                </div>
                <div className="flex article-recent-secondary article-recent-author posts-container-flex">
                    <img src="/Images/PROFILE.svg" alt="prof" className="user-image article-image"/>
                    <div className="name-date">
                        <h3>{post.authorName}</h3>
                        <p className="article-info">{post.date.substring(0, post.date.lastIndexOf(':')).replace('T', ' ')}</p>
                    </div>
                </div>
            </article>)}
        </main>
    );
}

export default MainPosts;