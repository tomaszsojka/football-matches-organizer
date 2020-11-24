import React from "react";

import "./Profile.css";
import {sendHttpRequest} from "../../../Fetch/useFetch"
import auth from "../../../Auth";


export class Profile extends React.Component {

    state = {
        token: null,
        name: "",
        email: "",
        password: ""
    };

    componentDidMount() {
        this.setState({token : auth.getToken()});
        sendHttpRequest('GET', '/api/user/profileData?token=' + this.status.token)
        .then(responseData => {
            console.log(responseData);
            if(responseData.success) {
                this.setState({
                    name: responseData.name,
                    email: responseData.email,
                    password: responseData.password
                });
            }
            console.log(responseData.message);
        })
        .catch(err => {
            console.log(err);
        });
    }

    onSubmitLogout() {
        console.log("LOGOUT");
        sendHttpRequest('GET', '/api/user/logout?token=' + this.status.token)
        .then(responseData => {
            console.log(responseData);
            if(responseData.success) {
                //clean localStorage
                auth.logout();
                //Refresh page if logout success
                window.location.reload();
            }
            console.log(responseData.message);
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="main-container profile-container">
                
                <div className="profileContentContainer">
                    <div className="profile-header bottom-border">
                        Profile
                    </div>
                    <div className="profileBox bottom-border">
                        <img src="../Images/profile_picture.png" alt="profile logo" className="profile-image"/>
                        
                        <div className="flex profileData">
                            <div className="profileData-placehold">Name:</div>
                            <div>{`Tomasz Sojka`}</div>
                            <div/>
                        </div>
                        <div className="flex profileData">
                            <div className="profileData-placehold">Email:</div>
                            <div className="textWrap">{`tomasoj305@student.polsl.pl`}</div>
                            <div/>
                        </div>
                        <div className="flex profileData">
                            <div className="profileData-placehold">Password:</div>
                            <div >{`*********`}</div>
                            <button type="button" className="changeBtn">
                                Edit
                            </button>
                        </div>

                    </div>
                    <div className="profile-header">Team invitations</div>
                    <div className="profileBox">
                        <div className="flex teamInvitation">
                            <img src="../Images/profile_picture.png" alt="profile logo" className="invite-image"/>
                            <div className="inviteContent">
                                <p>Team Vestra Vesteris is inviting you to join</p>
                                <div className="flex invite-buttons">
                                    <div className="changeBtn">join</div>
                                    <div className="changeBtn">delete</div>
                                </div>
                            </div>   
                        </div>
                        <div className="flex teamInvitation">
                            <img src="../Images/profile_picture.png" alt="profile logo" className="invite-image"/>
                            <div className="inviteContent">
                                <p>Team Olimpia is inviting you to join</p>
                                <div className="flex invite-buttons">
                                    <div className="changeBtn">join</div>
                                    <div className="changeBtn">delete</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="subPageBtn" onClick={() => this.onSubmitLogout()}>Logout</button>
                        
                </div>
            </div>
        );
    }
}