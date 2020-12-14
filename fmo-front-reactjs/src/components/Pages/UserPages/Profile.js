import React from "react";

import "./Profile.css";
import sendHttpRequest from "../../../Fetch/useFetch";
import {connect} from "react-redux";
import {logout} from "../../../store/actions/authActions";

import ProfileInviteList from "./ProfileInviteList";


class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name : "",
            email : "", 
            teamInvites : [{}]
        };
    }

    componentDidMount() {
        console.log(this.props.auth);
        sendHttpRequest('GET', '/api/user/profileData?token=' + this.props.auth.token)
        .then(responseData => {
            if(responseData.success) {
                this.setState({
                    name: responseData.name,
                    email: responseData.email,
                    teamInvites: responseData.teamInvites
                });
                
            }
            console.log(this.state);
            console.log(responseData.message);
        })
        .catch(err => {
            console.log(err);
        });
    }

    onSubmitLogout() {
        sendHttpRequest('GET', '/api/user/logout?token=' + this.props.auth.token)
        .then(responseData => {
            console.log(responseData);


            if(responseData.success) {
                //clean localStorage
                //clean redux storage
                this.props.logout();
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
            <div className="main-container profile-container central-container ">
                
                <div className="boxContainer">
                    <div className="boxContainer-header bottomBorder">
                        Profile
                    </div>
                    <div className="flex profileBox bottomBorder">
                        <img src="../Images/profile_picture.png" alt="profile logo" className="user-image profile-image"/>
                        
                        <div className="flex profileData">
                            <div className="profileData-placehold">Name:</div>
                            <div className="textWrap profileData-text">{this.state.name}</div>
                            <div/>
                        </div>
                        <div className="flex profileData">
                            <div className="profileData-placehold">Email:</div>
                            <div className="textWrap profileData-text">{this.state.email}</div>
                            <div/>
                        </div>
                        <div className="flex profileData">
                            <div className="profileData-placehold">Password:</div>
                            <div className="textWrap profileData-text">***** ***</div>
                            <button type="button" className="greyBtn editBtn">
                                Edit
                            </button>
                        </div>

                    </div>
                    <div className="boxContainer-header">Team invitations</div>
                    <ProfileInviteList teamInvites={this.state.teamInvites}/>
                    {/* <div className="flex profileBox">
                        <div className="flex teamInvitation">
                            <img src="../Images/bayern.jpg" alt="profile logo" className="team-image invite-image"/>
                            <div className="inviteContent">
                                <p>Team Bayern is inviting you to join</p>
                                <div className="flex invite-buttons">
                                    <div className="greyBtn editBtn">join</div>
                                    <div className="greyBtn editBtn">delete</div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <button type="button" className="greenBtn logoutBtn" onClick={() => this.onSubmitLogout()}>Logout</button>
                        
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout : () => {
            dispatch(logout());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Profile);