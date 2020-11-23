import React from "react";
import "./Toolbar.css";
import {Link} from "react-router-dom";
import Auth from "../../../Auth";


function Toolbar (props) {

    const openCloseDropDownMenu = () => {
        props.dropDownMenuClickHandler(!props.isOpen);
    }

    const logout = () => {
        
        //TODO delete
        Auth.logout();
        window.location.reload(false);
    }

    return(
        <header className={`toolbar ${props.isOpen ? " show-navigation-items" : ""}`}>
            <nav>
                <div className="toolbar-base">
                    <div className="logo">
                    <Link to="/user" onClick={() => openCloseDropDownMenu()}>LOGO</Link>
                    </div>
                    <ion-icon class="menu-icon" name="menu-outline" onClick={() => openCloseDropDownMenu()}></ion-icon>
                </div>
                {/* main nav */}
                <div className={`toolbar-navigation-items`}>
                    <ul>
                        {/* a was not closing ulist smoothly before reloading */}
                        <li><Link to="/user" onClick={() => openCloseDropDownMenu()}>HOME</Link></li>
                        <li><Link to="/user/posts" onClick={() => openCloseDropDownMenu()}>POSTS</Link></li>
                        <li><Link to="/user/teams" onClick={() => openCloseDropDownMenu()}>TEAMS</Link></li>
                        <li><Link to="/user/contact" onClick={() => openCloseDropDownMenu()}>CONTACT</Link></li>
                        <li>
                            <Link to="/user/profile" onClick={() => logout()}>
                                <ion-icon className="acc-icon" color = "white" name="person"></ion-icon>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Toolbar;