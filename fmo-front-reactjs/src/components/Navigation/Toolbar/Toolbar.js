import React from "react";
import classes from "./Toolbar.module.css";
import {Link} from "react-router-dom";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";

function Toolbar (props) {
       return(
        <header className={classes.toolbar}>
            <nav className={classes.toolbar_navigation}>
                <div className={classes.toolbar_logo}><a href="/">LOGO</a></div>
                <div className={classes.spacer}></div>
                <div className={classes.toolbar_navigation_items}>
                    <ul>
                        <li><a href="/menu">MENU</a></li>
                        <li><a href="/gallery">GALLERY</a></li>
                        <li><a href="/">HOME</a></li>
                        <li><a href="/contact">CONTACT</a></li>
                    </ul>
                </div>
                <div className={classes.toolbar_navigation}>
                    <Link to="/access_account">
                        <ion-icon className={classes.acc_icon} color = "dark" name="person"></ion-icon>
                    </Link>
                    {/* <DrawerToggleButton click={props.drawerClickHandler}/> */}
                </div>
            </nav>
        </header>
    );
};

export default Toolbar;