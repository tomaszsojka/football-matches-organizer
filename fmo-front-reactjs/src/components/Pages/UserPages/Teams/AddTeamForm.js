import React from "react";
import ".././../GuestPages/GuestPage.css";
import sendHttpRequest from "../../../../Fetch/useFetch";

import { connect } from "react-redux";

class AddTeamForm extends React.Component {
//TODO if we have time password strength bar
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            location : "",
            errors: []
        };
    }

    showValidationErr(elm, msg) {
        this.setState((prevState) => ({
                errors: [
                    ...prevState.errors,
                    {elm, msg}
                ]
            })
        );
    }

    clearValidationErr(elm) {
        this.setState((prevState) => {
            let newArr = [];
            for(let err of prevState.errors) {
                if(elm !== err.elm) {
                    newArr.push(err);
                }
            }
            return {errors: newArr};
        });
    }

    onNameChange(e) {
        this.setState({
            name: e.target.value
        });
        this.clearValidationErr("name");
    }

    onLocationChange(e) {
        this.setState({
            location: e.target.value
        });
        this.clearValidationErr("location");
    }

    submitAddTeam(e) {
        let isError = false;
        if(this.state.name === "") {
            this.showValidationErr("name", "Name cannot be empty");
            isError = true;
        }
        if(this.state.location === "") {
            this.showValidationErr("location", "Location cannot be empty");
            isError = true;
        }

        if(isError === false) {
            console.log("Team data is ok");
            const req = {
                token : this.props.auth.token,
                name : this.state.name,
                location : this.state.location
            };
            sendHttpRequest('POST', "/api/user/add-team", req)
                .then(responseData => {
                    console.log(responseData);
                    if(!responseData.success) {
                        this.showValidationErr("location", responseData.message);
                    } else {
                        console.log("SUCCESSS");
                        //if redirecting function is not passed as a prop variable is null
                        let submitRedirect = this.props.submitRedirect || null;
                        if(submitRedirect) {
                            this.props.submitRedirect();
                        }
                    }
                })
                .catch(err => {
                    this.showValidationErr("location", " Server error");
                    console.log(err, err.data);
                });
        }
    }

    render() {

        let nameErr = null, locationErr = null;

        for(let err of this.state.errors) {
            if(err.elm === "name") {
                nameErr = err.msg;
            }
            if(err.elm === "location") {
                locationErr = err.msg;
            }
        }

        return (
            <div className="boxContainer">
                <div className="boxContainer-header bottomBorder">
                    {this.props.title}
                </div>
                <div className="flex box">

                    <div className="flex inputGroup">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="formInput"
                            required
                            placeholder="Name of new team"
                            onChange={this.onNameChange.bind(this)}
                        />
                        <small className="passingError">{ nameErr ? nameErr : "" }</small>
                    </div>

                    <div className="flex inputGroup">
                        <label htmlFor="email">Email</label>
                        <input
                            type="location"
                            name="location"
                            className="formInput"
                            placeholder="Location / region"
                            onChange={this.onLocationChange.bind(this)}
                        />
                        <small className="passingError">{ locationErr ? locationErr : "" }</small>
                    </div>
                    <button
                        type="button"
                        className="greenBtn formBtn"
                        onClick={this.submitAddTeam.bind(this)}>{this.props.title}
                    </button>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        teams: state.teamsReducer,
        auth: state.authReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (AddTeamForm);