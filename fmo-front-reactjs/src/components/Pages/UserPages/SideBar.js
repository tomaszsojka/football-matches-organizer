import React from "react";
import { Link } from "react-router-dom";
import "./Posts.css";
import Teams from "./Teams/Teams";
import TeamsList from "./Teams/TeamsList";

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
            <Link to={"/user/teams"}>           
                <div className="sidebar-widget">
                    <h4 className="widget-title bottomBorder">TEAMS</h4>
                    <img src="/Images/teamsLogos.png" alt="" className="widget-image"/>
                    {/* <TeamsList teams={this.props.teams.teams} userId={this.props.auth.userId}/> */}
                </div>
            </Link>

            <div className="sidebar-widget">
                <h4 className="widget-title bottomBorder">POPULAR POSTS</h4>
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
        </aside>
    );
}

export default SideBar;