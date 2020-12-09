import React from "react";
import "./Posts.css";
import Teams from "./Teams/Teams";

const SideBar = (props) => {
    return (
        <aside className="sidebar">
            {/* {props.sideBlocks.map((block) =>
            <div className="sidebar-widget">
                <h2 className="widget-title">{block.title}</h2>
                <img src="/Images/Calendar.jpg" alt="" className="widget-image"/>
            <p className="widget-body">{block.content}</p>
            </div>
            )} */}
            <div className="sidebar-widget">
                <h2 className="widget-title">POPULAR POSTS</h2>
                <div className="flex widget-recent-post">
                    <h3 className="widget-recent-post-title">Team Bayern Munich is looking for a defender</h3>
                    {/* <img src="/Images/white_n_flower.jpg" alt="" className="widget-image"/> */}
                </div>
                <div className="flex widget-recent-post">
                    <h3 className="widget-recent-post-title">Looking for the team playing near Bielszowice </h3>
                    {/* <img src="/Images/white_n_flower.jpg" alt="" className="team-image article-image"/>  */}
                </div>  
                <div className="flex widget-recent-post">
                    <h3 className="widget-recent-post-title">Is there a team that wants to take part in sparing in Katowice?</h3>
                    {/* <img src="/Images/white_n_flower.jpg" alt="" className="team-image article-image"/>  */}
                </div>
            </div>
            {/* <Teams/> */}
        </aside>
    );
}

export default SideBar;