import React from 'react';


import {
  Appointments,
  AppointmentForm, 
  ConfirmationDialog
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
    // eslint-disable-next-line react/destructuring-assignment
    if (props.type === 'multilineTextEditor') {
      return null;
    } else {
        return <AppointmentForm.TextEditor {...props} />;
    }
  };
  

export const BasicLayout = ({ onFieldChange, appointmentData, appointmentResources, readOnly, ...restProps }) => {  
  // console.log(appointmentData, appointmentResources, restProps);
  const loadDefaultResource = (nextValue) => {
    onFieldChange({ eventType: nextValue });

  }
  
  //when appointment is added no resource instance is chosen, so it takes first as default
    if(appointmentResources.length === 0) {
      appointmentResources.push(restProps.resources[0].instances[0]);
      

      //then sets appointmentData "eventType" field (here to "training") 
      //!!!!!!!   IT GIVES WARNING : Cannot update during an existing state transition    !!!!!!!
      loadDefaultResource(restProps.resources[0].instances[0].id);
      // appointmentData.eventType = restProps.resources[0].instances[0].id;
    }
    
      console.log(appointmentData, appointmentResources, restProps);
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
        readOnly={readOnly}
      />;
  
    let isMatch = false;
    //just the check one more time if there is appointmentResources
    if(appointmentResources.length > 0) {
      //set isMatch -> show textEditor for opponent name
      if(appointmentResources[0].id === "match") { 
        isMatch = true;

        // readOnly = true;
      } else if(appointmentData.startDate) {
        if(appointmentData.startDate < Date.now()) {
          console.log("here");
          readOnly = true;
        } else {
          // readOnly = false;
        }
      }
    }

    return (
        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            appointmentResources={appointmentResources}
            readOnly={readOnly}
            {...restProps}
        >
          {/* <AppointmentForm.ResourceEditor
            appointmentResources={appointmentResources}
            resouce={{fieldName: "eventType", isMain: true, title: "Event type", allowMultiple: false, instances: [{id: "training", color: "#2f9e13", fieldName: "eventType", text: "Training", title: "Event type", allowMultiple: false, isMain: true},{id: "match", color: "#1b3b13", fieldName: "eventType", text: "Match", title: "Event type", allowMultiple: false, isMain: true}]}}

          /> */}
          <AppointmentForm.Label
              text="Location"
              type="title"
          />
          <AppointmentForm.TextEditor
              value={appointmentData.location}
              onValueChange={onLocationFieldChange}
              placeholder="Location of the event"
              readOnly={readOnly}
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
  readOnly = true;
  return (
      <AppointmentForm.ResourceEditor
          appointmentResources={appointmentResources}
          readOnly={readOnly}
          {...restProps}
      />
  )
}

export const CaptainResourceEditor = ({onResourceChange, ...restProps }) => {
  console.log(restProps);
  if(restProps.appointmentResources.length === 0) {
    // onResourceChange({eventType: restProps.resource.instances[0].id});   
  }
  return (
      <AppointmentForm.ResourceEditor
      onResourceChange={onResourceChange}
          {...restProps}
      />
  )
}

/* CONFIRMATION DIALOG CUSTOMS */
export const ConfLayout = ({...restProps }) => {
  return (
      <ConfirmationDialog.Layout
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
    },
    { 
        title: 'Training', 
        startDate: new Date(2020, 11, 20, 12, 30), 
        endDate: new Date(2020, 11, 20, 14, 0), 
        id: 3, 
        location: "", 
        eventType: 'training'
    },
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