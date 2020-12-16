import React from 'react';
import {Redirect} from 'react-router-dom';
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
    resources
} from "./TeamCalendarCustoms";

class TeamCalendar extends React.Component {
    constructor(props) {
        super(props);
        const pathWithoutCalendar = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
        this.state = {
            teamId: pathWithoutCalendar.substring(pathWithoutCalendar.lastIndexOf('/') + 1),
            isRedirect : false,
            currentDate : Date.now(),
            data : schedulerData,

            addedAppointment: {},
            appointmentChanges: {},
            editingAppointment: undefined,
        };
    }

    //called on start and every change in adding appointment form
    //addedAppointment contains all the data about the appointment added
    changeAddedAppointment(addedAppointment) {
        console.log("ADD : ", addedAppointment);
        this.setState({ addedAppointment });
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
        this.setState({ editingAppointment });
    }


    commitChanges({ added, changed, deleted }) {
        this.setState((state) => {
          let { data } = state;
          console.log(data);
          if (added) {
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            data = [...data, { id: startingAddedId, ...added }];
          }
          if (changed) {
            data = data.map(appointment => (
              changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
          }
          if (deleted !== undefined) {
            data = data.filter(appointment => appointment.id !== deleted);
          }
          return { data };
        });
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
                            <WeekView
                                startDayHour={8}
                                endDayHour={22}
                            />
                            <ConfirmationDialog />
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
                                basicLayoutComponent={BasicLayout}
                                textEditorComponent={TextEditor}
                                messages={messages}
                                booleanEditorComponent={BooleanEditor}

                                commandLayoutComponent={CommandLayout}
                            />
                            <CurrentTimeIndicator
                                shadePreviousCells={true}
                                shadePreviousAppointments={true}
                                updateInterval={1000000}
                            />
                        </Scheduler>
                    </Paper>
               </div>
            );
        }
    }
}

export default TeamCalendar;
