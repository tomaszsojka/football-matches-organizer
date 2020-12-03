import React from "react";
import "../../GuestPages/GuestPage.css";
import AddTeamForm from "./AddTeamForm";
import { Redirect } from "react-router-dom";


class AddTeam extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRedirect : false
        };
    }

    redirectToTeamList() {
        this.setState({
            isRedirect : true
        });
    }

    render() {
        if(this.state.isRedirect) {
            return <Redirect to={"/user/teams"}/>;
        } else {
            return(
                <div className="main-container central-container">
                    <AddTeamForm title="Add Team" submitRedirect={this.redirectToTeamList.bind(this)}/>
                </div>
            );
        }
    }
}

export default AddTeam;