import React from 'react';


import {
  Appointments,
  AppointmentForm
} from '@devexpress/dx-react-scheduler-material-ui';

/* APPOINTMENT CUSTOMS */
export const Appointment = ({
    children, style, ...restProps
  }) => {
      // console.log(restProps);
    //   console.log(style);
    //   console.log(children);
      
      return (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        // opacity: "0.2"
        // display: "none",
        // backgroundColor: '#2f9e13',
        // borderRadius: '3px'
      }}
    >
      {children}
    </Appointments.Appointment>
  )};

  
/* APPOINTMENTFORM CUSTOMS */

export const messages = {
    detailsLabel : 'About event',
    moreInformationLabel: '',
  };
//disabling default multiline input
export const TextEditor = (props) => {
    // console.log(props);
    // eslint-disable-next-line react/destructuring-assignment
    if (props.type === 'multilineTextEditor') {
      return null;
    } else {
        return <AppointmentForm.TextEditor {...props} />;
    }
  };
  
export const BasicLayout = ({ onFieldChange, appointmentData, appointmentResources, ...restProps }) => {
    console.log(restProps);
    console.log(appointmentResources);
    console.log(appointmentResources[0]);
    

    const onLocationFieldChange = (nextValue) => {
        onFieldChange({ location: nextValue });
    };
    const onOpponentFieldChange = (nextValue) => {
        onFieldChange({ opponent: nextValue });
    };

    
    const opponentLabel = 
      <AppointmentForm.Label
        text="Team name to play with"
        type="title"
      />;
    const opponentField =
      <AppointmentForm.TextEditor
        value={appointmentData.opponent}
        onValueChange={onOpponentFieldChange}
        placeholder="Name of opponent team to invite for match"
      />;
  
    let isMatch = false;
    if(appointmentResources.length > 0) {
      if(appointmentResources[0].id === "match") { 
        isMatch = true;
      }
    }

    return (
        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            appointmentResources={appointmentResources}
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
            {isMatch &&  opponentLabel}
            {isMatch &&  opponentField}
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


export const ResourceEditor = ({readOnly, appointmentResources, ...restProps }) => {
  // console.log(restProps);
  // console.log(appointmentResources);
  //when appointment is added no resource instance is chosen, so it takes first as default
  if(appointmentResources.length === 0) {
    appointmentResources.push(restProps.resource.instances[0]);
  }
  readOnly = true;
  return (
      <AppointmentForm.ResourceEditor
          appointmentResources={appointmentResources}
          readOnly={readOnly}
          {...restProps}
      />
  )
}

export const CaptainResourceEditor = ({appointmentResources, ...restProps }) => {
  // console.log(restProps);
  // console.log(appointmentResources);
  //when appointment is added no resource instance is chosen, so it takes first as default
  if(appointmentResources.length === 0) {
    appointmentResources.push(restProps.resource.instances[0]);
  }
  return (
      <AppointmentForm.ResourceEditor
          appointmentResources={appointmentResources}
          {...restProps}
      />
  )
}





/* DATA */

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

/* RESOURCES */
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