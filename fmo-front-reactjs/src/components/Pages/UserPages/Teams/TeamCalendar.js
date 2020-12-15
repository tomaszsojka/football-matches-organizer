import React from 'react';
import {Redirect} from 'react-router-dom';


class TeamCalendar extends React.Component {
    constructor(props) {
        super(props);
        const pathWithoutCalendar = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
        this.state = {
            teamId: pathWithoutCalendar.substring(pathWithoutCalendar.lastIndexOf('/') + 1),
            isRedirect : false
        };
        console.log(pathWithoutCalendar);
        console.log(this.state);
    }
    
    render() {
        if(this.state.isRedirect) {
            return <Redirect to={"/user/teams404"}/>
        } else {
            return (
                <div >
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    CALENDAR
                </div>
            );
        }
    }
}

export default TeamCalendar;
