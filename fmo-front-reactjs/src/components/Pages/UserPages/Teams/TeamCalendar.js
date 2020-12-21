import React from 'react';
import {Redirect} from 'react-router-dom';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import { connect } from "react-redux";  
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView, 
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  AppointmentForm,
  AppointmentTooltip,
  EditRecurrenceMenu, 
  ConfirmationDialog,

  Resources,
  CurrentTimeIndicator,
} from '@devexpress/dx-react-scheduler-material-ui';

import "./TeamCalendar.css";
import {
    Appointment, 
    schedulerData, 
    messages, 
    TextEditor, 
    BasicLayout, 
    BooleanEditor,
    CommandLayout,
    ResourceEditor,
    CaptainResourceEditor,
    ConfLayout,
    resources
} from "./TeamCalendarCustoms";
import sendHttpRequest from "../../../../Fetch/useFetch";
import { setUserId } from "../../../../store/actions/authActions";

class TeamCalendar extends React.Component {
    constructor(props) {
        super(props);
        const pathWithoutCalendar = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
        this.state = {
            teamId: pathWithoutCalendar.substring(pathWithoutCalendar.lastIndexOf('/') + 1),
            isCaptain: false,
            isRedirect : false,
            currentDate : Date.now(),
            data : [],

            addedAppointment: {},
            appointmentChanges: {},
            editingAppointment: undefined,

            isFormVisible : undefined,
            isAppointmentBeingCreated : false,
            allowUpdating : false
        };
    }

    componentDidMount() {
        sendHttpRequest('GET', '/api/user/appointments?teamId=' + this.state.teamId)
        .then(responseAppointments => {
            if(!responseAppointments.success) {
                ToastsStore.error(`${responseAppointments.message}`);
                this.setState({isRedirect: true});
            } else {
                console.log(responseAppointments.message);
                sendHttpRequest('GET', '/api/user/getUserId?token=' + this.props.auth.token)
                .then(responseUserId => {
                    if(!responseUserId.success) {
                        ToastsStore.error(`${responseUserId.message}`);
                    } else {
                        this.props.setUserId(responseUserId.userId);
                        //eventType is not stored in database
                        responseAppointments.trainings.forEach(training => training.eventType="training");
                        responseAppointments.matches.forEach(training => training.eventType="match");
                        const allData = [...responseAppointments.trainings, ...responseAppointments.matches];
                        this.setState({data : allData});
                        sendHttpRequest('GET', '/api/user/getTeamInfo?teamId=' + this.state.teamId)
                        .then(responseCaptainId => {
                            if(!responseCaptainId.success) {
                                ToastsStore.error(`${responseCaptainId.message}`);
                            } else {
                                if(responseCaptainId.captainId === this.props.auth.userId) {
                                    this.setState({isCaptain : true});
                                }
                            }
                        })
                        .catch(err => {
                            ToastsStore.error("Server error");
                            console.log(err);
                        });
                    }
                })
                .catch(err => {
                    ToastsStore.error("Server error");
                    console.log(err);
                });
            }
        })
        .catch(err => {
            ToastsStore.error("Server error");
            this.setState({isRedirect: true});
            console.log(err);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.data !== prevState.data) {
            // console.log(this.state.addedAppointment);
            if(this.state.addedAppointment) {
                if(this.state.addedAppointment.eventType === "training") {
                    const req = {
                        teamId : this.state.teamId,
                        ...this.state.addedAppointment
                    };
                    sendHttpRequest('POST', "/api/user/add-training", req)
                        .then(responseData => {
                            if(!responseData.success) {
                                ToastsStore.error(`${responseData.message}`);
                            } else {
                                console.log(responseData.message);
                            }
                        })
                        .catch(err => {
                            ToastsStore.error("Server error");
                            console.log(err, err.data);
                        });
                } else {
                    const req = {
                        hometeamId : this.state.teamId,
                        ...this.state.addedAppointment
                    };
                    sendHttpRequest('POST', "/api/user/add-match", req)
                    .then(responseData => {
                        if(!responseData.success) {
                            ToastsStore.error(`${responseData.message}`);
                        } else {
                            ToastsStore.success(`Invite for the match sent to ${this.state.addedAppointment.opponent} team`);
                            console.log(responseData.message);
                        }
                    })
                    .catch(err => {
                        ToastsStore.error("Server error");
                        console.log(err, err.data);
                    });
                }
                
            }
          }
    }

    //called on start and every change in adding appointment form
    //addedAppointment contains all the data about the appointment added
    changeAddedAppointment(addedAppointment) {
        // console.log("ADD : ", addedAppointment);
        this.setState({ 
            addedAppointment,
            isAppointmentBeingCreated : true
         });
    }
    //called on every change in edited appointment form
    //appointmentChanges contains all changed inputs data
    changeAppointmentChanges(appointmentChanges) {
        // console.log("CHANGE : ", appointmentChanges);
        this.setState({ appointmentChanges });
    }
    //called on star and end of editing appointment
    //editingAppointment contains at the beginning all data about edited appointment, at the end is undefined
    changeEditingAppointment(editingAppointment) {
        // console.log("EDIT : ", editingAppointment);
        this.setState({ 
            editingAppointment
         });
    }


    commitChanges({ added, changed, deleted }) {
        this.setState((state) => {
          let { data } = state;
          if (added) {
              if(added.eventType === "training") {
                if(!added.title) {
                    added.title = "TRAINING"
                }
              } else {
                if(!added.opponent) {
                    ToastsStore.error("You need to pass correct opponent team name to set match event");
                    return null;
                } else {
                    //send invite to the opponent team for the match
                }
                if(!added.title) {
                    added.title = `MATCH VS ${added.opponent}`
                }
              }
            //   const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
              data = [...data, {...added }];
          }
          if (changed) {
            data = data.map(appointment => (
              changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
          }
          if (deleted !== undefined) {
            data = data.filter(appointment => appointment.id !== deleted);
          }
          return { data, isAppointmentBeingCreated : false };
        });
      }

    onCancelForm() {
        console.log("here");
        this.setState({isAppointmentBeingCreated : false})
    }
    
    render() {

        if(this.state.isRedirect) {
            return <Redirect to={"/user/teams404"}/>
        } else {
            return (
               <div className="calendar-container">
                    <Paper>
                        <Scheduler
                        data={this.state.data}
                        firstDayOfWeek={1}
                        // height={1471}
                        >
                            <ViewState defaultCurrentDate={this.state.currentDate}/>
                            <EditingState
                                onCommitChanges={this.commitChanges.bind(this)}

                                                    
                                addedAppointment={this.state.addedAppointment}
                                onAddedAppointmentChange={this.changeAddedAppointment.bind(this)}

                                appointmentChanges={this.state.appointmentChanges}
                                onAppointmentChangesChange={this.changeAppointmentChanges.bind(this)}

                                editingAppointment={this.state.editingAppointment}
                                onEditingAppointmentChange={this.changeEditingAppointment.bind(this)}
                            />
                            <EditRecurrenceMenu /> 
                            <ConfirmationDialog 
                                layoutComponent={ConfLayout}
                            />
                            <WeekView
                                startDayHour={8}
                                endDayHour={22}
                            />
                            <Toolbar />
                            <DateNavigator />
                            <TodayButton />
                            <Appointments className="training-container" appointmentComponent={Appointment}/>
                            <Resources
                                data={resources}
                                
                                fieldExpr='eventType'
                            />
                            <AppointmentTooltip
                                showOpenButton
                            />
                            <AppointmentForm 
                                visible={this.state.isFormVisible}
                                readOnly={this.state.isAppointmentBeingCreated ? false : !this.state.allowUpdating}

                                basicLayoutComponent={BasicLayout}
                                textEditorComponent={TextEditor}
                                messages={messages}
                                booleanEditorComponent={BooleanEditor}

                                commandLayoutComponent={CommandLayout}
                                resourceEditorComponent={this.state.isCaptain ? CaptainResourceEditor : ResourceEditor}

                                onCancelButtonClick={() => this.onCancelForm()}
                            />
                            <CurrentTimeIndicator
                                shadePreviousCells={true}
                                shadePreviousAppointments={true}
                                updateInterval={900000}
                            />
                        </Scheduler>
                    </Paper>
                    <ToastsContainer store={ToastsStore}/>
               </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUserId: (userId) => {
            dispatch(setUserId(userId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (TeamCalendar);
