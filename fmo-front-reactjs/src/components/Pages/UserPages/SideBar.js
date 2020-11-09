import React from "react";
import "./Posts.css";

export const SideBar = (props) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-widget">
                <h2 className="widget-title">ABOUT ME</h2>
                <img src="../Images/white_n_flower.jpg" alt="" className="article-image"/>
                <p className="widget-body">I find life better, and I'm happier, when things are nice and simple.</p>

            </div>
            <div className="sidebar-widget">
                <h2 className="widget-title">RECENT POSTS</h2>
                <div className="widget-recent-post">
                    <h3 className="widget-recent-post-title">Keeping cooking simple</h3>
                    <img src="../Images/white_n_flower.jpg" alt="" className="article-image"/>
                </div>
                <div className="widget-recent-post">
                    <h3 className="widget-recent-post-title">Simplicity and work</h3>
                    <img src="../Images/white_n_flower.jpg" alt="" className="article-image"/> 
                </div>  
                <div className="widget-recent-post">
                    <h3 className="widget-recent-post-title">Simple decorations</h3>
                    <img src="../Images/white_n_flower.jpg" alt="" className="article-image"/> 
                </div>
            </div>
        </aside>
    );
}