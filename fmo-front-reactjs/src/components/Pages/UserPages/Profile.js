import React from "react";

import "./Profile.css";
import {sendHttpRequest} from "../../../Fetch/useFetch"
import auth from "../../../Auth";


export class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name : "",
            email : "",
            token: ""
        };
    }

    componentDidMount() {
        let tok = auth.getToken();
        sendHttpRequest('GET', '/api/user/profileData?token=' + tok)
        .then(responseData => {
            console.log(responseData);
            if(responseData.success) {
                this.setState({
                    name: responseData.name,
                    email: responseData.email,
                    // setstate in callback not to cause render() being called twice
                    token : tok
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
        sendHttpRequest('GET', '/api/user/logout?token=' + this.state.token)
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
        // this.setState({token : auth.getToken()});

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
                            <div>{this.state.name}</div>
                            <div/>
                        </div>
                        <div className="flex profileData">
                            <div className="profileData-placehold">Email:</div>
                            <div className="textWrap">{this.state.email}</div>
                            <div/>
                        </div>
                        <div className="flex profileData">
                            <div className="profileData-placehold">Password:</div>
                            <div className="textWrap">***** ***</div>
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