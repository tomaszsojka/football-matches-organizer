import React from 'react';


import {
  Appointments,
  AppointmentForm
} from '@devexpress/dx-react-scheduler-material-ui';


export const Appointment = ({
    children, style, ...restProps
  }) => {
    //   console.log(restProps);
    //   console.log(style);
    //   console.log(children);
      
      return (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        // backgroundColor: '#2f9e13',
        // borderRadius: '3px'
      }}
    >
      {children}
    </Appointments.Appointment>
  )};

export const messages = {
    detailsLabel : 'About event',
    moreInformationLabel: '',
  };
export const TextEditor = (props) => {
    // console.log(props);
    // eslint-disable-next-line react/destructuring-assignment
    if (props.type === 'multilineTextEditor') {
      return null;
    } else {
        return <AppointmentForm.TextEditor {...props} />;
    }
  };
  
export const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    // console.log(restProps);
    console.log(appointmentData);
    const onLocationFieldChange = (nextValue) => {
        onFieldChange({ location: nextValue });
    };
    const onOpponentFieldChange = (nextValue) => {
        onFieldChange({ opponent: nextValue });
    };
  
    return (
        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            {...restProps}
        >
            <AppointmentForm.Label
                text="Location"
                type="title"
            />
            <AppointmentForm.TextEditor
                value={appointmentData.location}
                onValueChange={onLocationFieldChange}
                placeholder="Location of the event"
            />
            <AppointmentForm.Label
                text="Team name to play with"
                type="title"
            />
            <AppointmentForm.TextEditor
                value={appointmentData.opponent}
                onValueChange={onOpponentFieldChange}
                placeholder="Name of opponent team to invite for match"
            />
      </AppointmentForm.BasicLayout>
    );
  };
export const BooleanEditor = props => {
      if(props.label === 'All Day') {
            //returns null, to hide all day option 
            return null;
      } else {
            return <AppointmentForm.BooleanEditor {...props} />;
      }
  };

export const CommandLayout = ({ onCommitButtonClick, ...restProps }) => {
    // console.log(restProps);
    return (
        <AppointmentForm.CommandLayout
            onCommitButtonClick={onCommitButtonClick}
            {...restProps}
        />
    )
}




export const schedulerData = [
    { 
        title: 'Training', 
        startDate: new Date(2020, 11, 14, 10, 45), 
        endDate: new Date(2020, 11, 14, 12, 45), 
        id: 0,
        location: "Bielszowice", 
        eventType: 'training'
    },
    { 
        title: 'Training', 
        startDate: new Date(2020, 11, 16, 9, 45), 
        endDate: new Date(2020, 11, 16, 11, 0), 
        id: 1, 
        location: "", 
        eventType: 'training'
    },
    { 
        title: 'Match with Olimpia', 
        startDate: new Date(2020, 11, 18, 12, 0), 
        endDate: new Date(2020, 11, 18, 13, 30), 
        id: 2, 
        location: "", 
        eventType: 'match', 
        opponent: "Olimpia"
    }
  ];

export const resources = [
    {
        id: 0, 
        fieldName: 'eventType',
        title: 'Event type',
        instances: [
            {id: 'training', text: 'Training', color: '#2f9e13'},
            {id: 'match', text: 'Match', color: '#1b3b13'}
        ]
    }
];