import React, {useState} from "react";
import "./Toolbar.css";
import {Link} from "react-router-dom";


function Toolbar (props) {
    const[open, setOpen] = useState(false);

    return(
        <header className="toolbar">
            <nav>
                <div className="base">
                    <div className="logo">
                        <a href="/">LOGO</a>
                    </div>
                    <ion-icon class="menu-icon" name="menu-outline" onClick={() => setOpen(!open)}></ion-icon>
                </div>
                {/* main nav */}
                <div className={`toolbar-navigation-items ${open ? " show-navigation-items" : ""}`}>
                    <ul>
                        <li><a href="/">HOME</a></li>
                        <li><a href="/posts">POSTS</a></li>
                        <li><a href="/gallery">GALLERY</a></li>
                        <li><a href="/contact">CONTACT</a></li>
                        <li>
                            <Link to="/access-account">
                                <ion-icon className="acc-icon" color = "dark" name="person"></ion-icon>
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* side nav */}
                {/* <div className={`toolbar-navigation-items ${open ? " show-navigation-items" : ""}`}>
                    <ul>
                        <li>
                            <Link to="/access-account">
                                <ion-icon className="acc-icon" color = "dark" name="person"></ion-icon>
                            </Link>
                        </li>
                    </ul>
                </div> */}
            </nav>
        </header>
    );
};

export default Toolbar;