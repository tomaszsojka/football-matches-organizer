import React from "react";

import "./Profile.css";


const Contact = (props) => {

    return (
        <div className="main-container profile-container central-container ">
            
            <div className="boxContainer">
                <div className="boxContainer-header bottomBorder">
                    HELP CENTER
                </div>
                <div className="contactBox-header">
                        ADMINISTRATORS
                </div>
                <div className="flex contactBox">
                    <img src="../Images/PROFILE.svg" alt="prof" className="user-image contact-image"/>
                    <div className="contact-info">
                        <div className="flex profileData">
                            <div className="profileData-placehold"></div>
                            <div className="textWrap profileData-text">Tomasz Sojka</div>
                            <div/>
                        </div>
                        <div className="flex profileData">
                            <div className="profileData-placehold">Phone:</div>
                            <a href="tel:+48 694 803 109" className="textWrap profileData-text">+48 721 022 243</a>
                        </div>
                        <div className="flex profileData">
                            <div className="profileData-placehold">Email:</div>
                            <a href="mailto:tomasoj@wp.pl" className="textWrap profileData-text">tomasoj@wp.pl</a>
                        </div>
                    </div>
                </div>
                <div className="contactBox-header">
                        IT HELP
                </div>
                <div className="flex contactBox">
                    <img src="../Images/PROFILE.svg" alt="prof" className="user-image contact-image"/>
                    <div className="contact-info">
                        <div className="flex profileData">
                            <div className="profileData-placehold"></div>
                            <div className="textWrap profileData-text">Tomasz Sojka</div>
                            <div/>
                        </div>
                        <div className="flex profileData">
                            <div className="profileData-placehold">Phone:</div>
                            <a href="tel:+48 694 803 109" className="textWrap profileData-text">+48 673 783 128</a>
                        </div>
                        <div className="flex profileData">
                            <div className="profileData-placehold">Email:</div>
                            <a href="mailto:tomasz.soj@gmail.com" className="textWrap profileData-text">tomasz.soj@gmail.com</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;