import React, {useState} from "react";
import "./Toolbar.css";
import {Link} from "react-router-dom";
import DropDownMenu from "../DropDownMenu/DropDownMenu";


function Toolbar (props) {
    const[open, setOpen] = useState(false);

    return(
        <header className="toolbar">
            <nav className="toolbar_navigation">
                <div className="toolbar_base">
                    <div className="toolbar_logo">
                        <a href="/">LOGO</a>
                    </div>
                    <DropDownMenu/>
                    <ion-icon class="menu-icon" name="menu-outline" onClick={() => setOpen(!open)}></ion-icon>
                </div>
                {/* main nav */}
                <div className={`toolbar_navigation_items ${open ? " show_navigation_items" : ""}`}>
                    <ul>
                        <li><a href="/menu">MENU</a></li>
                        <li><a href="/gallery">GALLERY</a></li>
                        <li><a href="/">HOME</a></li>
                        <li><a href="/contact">CONTACT</a></li>
                    </ul>
                </div>
                {/* side nav */}
                {/* <div className={`toolbar_navigation_items ${open ? " show_navigation_items" : ""}`}>
                    <ul>
                        <li>
                            <Link to="/access_account">
                                <ion-icon className="acc_icon" color = "dark" name="person"></ion-icon>
                            </Link>
                        </li>
                    </ul>
                </div> */}
            </nav>
        </header>
    );
};

export default Toolbar;