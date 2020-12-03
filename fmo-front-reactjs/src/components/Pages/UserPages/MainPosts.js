import React from "react";
import "./Posts.css";


const MainPosts = (props) => {
    return (
        <main role="main">
            {/* key added because of error */}
            {props.posts.map((post) => 
            <article key={post.id} className="flex article-recent posts-container-flex">
                <div className="article-recent-main">
                    <h2 className="article-title">{post.title}</h2>
                    <p className="article-body">{post.content}</p>
                    <div className="flex posts-container-flex comment-container">
                        <img src="../Images/profile_picture.png" alt="profile logo" className="user-image comment-image"/>
                        <input className="comment-input"></input>
                    </div>
                </div>
                <div className="flex article-recent-secondary article-recent-author posts-container-flex">
                    <img src="../Images/profile_picture.png" alt="profile logo" className="user-image article-image"/>
                    <div className="name-date">
                        <h3>Tomasz Sojka</h3>
                        <p className="article-info">{post.info}</p>
                    </div>
                </div>
            </article>)}
        </main>
    );
}

export default MainPosts;