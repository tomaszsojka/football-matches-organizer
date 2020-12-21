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

            isAppointmentBeingCreated : false,
            allowUpdating : false
        };

        this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
        this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
        this.changeEditingAppointment = this.changeEditingAppointment.bind(this);

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
                        //because mongoose was returning date with 'Z' in the end
                        allData.forEach(appointment => {
                            appointment.startDate = new Date(appointment.startDate);
                            appointment.endDate = new Date(appointment.endDate);
                        });
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
        //when there is appointment to add (it was created in commitChanges), after 
        if(this.state.addedAppointment && JSON.stringify(this.state.addedAppointment) !== '{}') { 
            console.log(JSON.stringify(this.state.addedAppointment));
            if(this.state.addedAppointment.eventType === "training") {
                const req = {
                    teamId : this.state.teamId,
                    ...this.state.addedAppointment
                };
                sendHttpRequest('POST', "/api/user/add-training", req)
                    .then(responseData => {
                        if(!responseData.success) {
                            ToastsStore.error(`${responseData.message}`);
                            this.setState({
                                addedAppointment : {}
                            });
                        } else {
                            console.log(responseData.message);
                            this.setState({
                                data : [...this.state.data, {...this.state.addedAppointment}],
                                addedAppointment : {}
                            });
                        }
                    })
                    .catch(err => {
                        ToastsStore.error("Server error");
                        this.setState({
                            addedAppointment : {}
                        });
                        console.log(err, err.data);
                    });
            } else {
                console.log("ADDING MATCH");
                const req = {
                    homeTeamId : this.state.teamId,
                    ...this.state.addedAppointment
                };
                sendHttpRequest('POST', "/api/user/add-match", req)
                .then(responseData => {
                    if(!responseData.success) {
                        ToastsStore.error(`${responseData.message}`, 4000);
                        this.setState({
                            addedAppointment : {}
                        });
                    } else {
                        ToastsStore.success(`Invitation for the match sent to ${this.state.addedAppointment.opponent} team`, 4000);
                        setTimeout(() => ToastsStore.info("Now wait for their captain to accept..."), 4000);
                        
                        // console.log(responseData.match);
                        this.setState({
                            //data is not being updated, because match needs to be accepted by opponent team
                            // data : [...this.state.data, {...this.state.addedAppointment}],
                            addedAppointment : {}
                        });
                    }
                })
                .catch(err => {
                    ToastsStore.error("Server error");
                    this.setState({
                        addedAppointment : {}
                    });
                    console.log(err, err.data);
                });
            }
        }
    }

    //called on start and every change in adding appointment form
    //addedAppointment contains all the data about the appointment added
    changeAddedAppointment(addedAppointment) {
        // console.log(addedAppointment);
        // console.log("ADD : ", addedAppointment);
        this.setState({ 
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
          let { data} = state;
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
            //   data = [...data, {...added }];
          }
          if (changed) {
            data = data.map(appointment => (
              changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
          }
          if (deleted !== undefined) {
            data = data.filter(appointment => appointment.id !== deleted);
          }
          return { data, isAppointmentBeingCreated : false, addedAppointment : added};
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

                                                    
                                // addedAppointment={this.state.addedAppointment}
                                onAddedAppointmentChange={this.changeAddedAppointment}

                                appointmentChanges={this.state.appointmentChanges}
                                onAppointmentChangesChange={this.changeAppointmentChanges}

                                editingAppointment={this.state.editingAppointment}
                                onEditingAppointmentChange={this.changeEditingAppointment}
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
