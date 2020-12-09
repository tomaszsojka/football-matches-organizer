import React from "react";
import "../Posts.css";

const TeamSideBar = (props) => {
    return (
        <aside className="sidebar">
            {props.sideBlocks.map((block) =>
            <div className="sidebar-widget">
                <h2 className="widget-title">{block.title}</h2>
                <img src="/Images/Calendar.jpg" alt="" className="widget-image"/>
            <p className="widget-body">{block.content}</p>
            </div>
            )}
        </aside>
    );
}

export default TeamSideBar;