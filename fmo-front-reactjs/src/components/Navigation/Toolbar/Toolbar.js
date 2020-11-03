import React from "react";
import "./Toolbar.css";
import {Link} from "react-router-dom";


function Toolbar (props) {

    const openCloseDropDownMenu = () => {
        props.dropDownMenuClickHandler(!props.isOpen);
    }

    return(
        <header className={`toolbar ${props.isOpen ? " show-navigation-items" : ""}`}>
            <nav>
                <div className="toolbar-base">
                    <div className="logo">
                    <Link to="/" onClick={() => openCloseDropDownMenu()}>LOGO</Link>
                    </div>
                    <ion-icon class="menu-icon" name="menu-outline" onClick={() => openCloseDropDownMenu()}></ion-icon>
                </div>
                {/* main nav */}
                <div className={`toolbar-navigation-items`}>
                    <ul>
                        {/* a was not closing ulist smoothly before reloading */}
                        <li><Link to="/" onClick={() => openCloseDropDownMenu()}>HOME</Link></li>
                        <li><Link to="/posts" onClick={() => openCloseDropDownMenu()}>POSTS</Link></li>
                        <li><Link to="/teams" onClick={() => openCloseDropDownMenu()}>TEAMS</Link></li>
                        <li><Link to="/contact" onClick={() => openCloseDropDownMenu()}>CONTACT</Link></li>
                        <li>
                            <Link to="/access-account" onClick={() => openCloseDropDownMenu()}>
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