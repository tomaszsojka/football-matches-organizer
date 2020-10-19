import React, {useState} from "react";
import "./Toolbar.css";
import {Link} from "react-router-dom";


function Toolbar (props) {
    const[open, setOpen] = useState(false);

    const openCloseDropDownMenu = (isOpen) => {
        if(props.isBackClicked) {
            isOpen = props.isBackClicked;
        }
        props.dropDownMenuClickHandler(isOpen);
        setOpen(isOpen);
    }

    return(
        <header className={`toolbar ${!props.isBackClicked ? " show-navigation-items" : ""}`}>
            <nav>
                <div className="toolbar-base">
                    <div className="logo">
                        <a href="/">LOGO</a>
                    </div>
                    <ion-icon class="menu-icon" name="menu-outline" onClick={() => openCloseDropDownMenu(!open)}></ion-icon>
                </div>
                {/* main nav */}
                <div className={`toolbar-navigation-items`}>
                    <ul>
                        {/* a was not closing ulist smoothly before reloading */}
                        <li><Link to="/access-account" onClick={() => openCloseDropDownMenu(!open)}>HOME</Link></li>
                        <li><Link to="/posts" onClick={() => openCloseDropDownMenu(!open)}>POSTS</Link></li>
                        <li><Link to="/gallery" onClick={() => openCloseDropDownMenu(!open)}>GALLERY</Link></li>
                        <li><Link to="/contact" onClick={() => openCloseDropDownMenu(!open)}>CONTACT</Link></li>
                        <li>
                            <Link to="/access-account" onClick={() => openCloseDropDownMenu(!open)}>
                                <ion-icon className="acc-icon" color = "dark" name="person"></ion-icon>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Toolbar;