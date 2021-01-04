import React from "react";
import "./Toolbar.css";
import {Link} from "react-router-dom";


const Toolbar = (props) => {

    const openCloseDropDownMenu = () => {
        props.dropDownMenuClickHandler(!props.isOpen);
    }

    return(
        <header className={`toolbar ${props.isOpen ? " show-navigation-items" : ""}`}>
            <nav className="flex">
                <div className="flex toolbar-base">
                    <div className="logo">
                    <Link to="/user" onClick={() => openCloseDropDownMenu()}>FMO</Link>
                    </div>
                    <ion-icon class="menu-icon" name="menu-outline" onClick={() => openCloseDropDownMenu()}></ion-icon>
                </div>
                {/* main nav */}
                <div className={`toolbar-navigation-items`}>
                    <ul className="flex">
                        {/* a was not closing ulist smoothly before reloading */}
                        <li><Link to="/user" onClick={() => openCloseDropDownMenu()}>POSTS</Link></li>
                        <li><Link to="/user/teams" onClick={() => openCloseDropDownMenu()}>TEAMS</Link></li>
                        <li><Link to="/user/contact" onClick={() => openCloseDropDownMenu()}>CONTACT</Link></li>
                        <li>
                            <Link to="/user/profile" onClick={() => openCloseDropDownMenu()}>
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