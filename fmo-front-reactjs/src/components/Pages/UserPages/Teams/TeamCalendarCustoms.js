import React from 'react';
import "./Teams.css";

import {
  Appointments,
  AppointmentForm, 
  ConfirmationDialog
} from '@devexpress/dx-react-scheduler-material-ui';

/* APPOINTMENT CUSTOMS */
export const Appointment = ({
    children, style, ...restProps
  }) => {
      
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
      } else if(appointmentData.startDate) {
        if(appointmentData.startDate < Date.now()) {
          readOnly = true;
        }
      }
    }


    let resultText = null;
    if(appointmentData) {
     if(appointmentData.isUpdated) {
      const homeScore = appointmentData.homeTeam.teamScore ? appointmentData.homeTeam.teamScore : "0";
      const awayScore = appointmentData.awayTeam.teamScore ? appointmentData.awayTeam.teamScore : "0";
        resultText = 
        <div style={{textAlign : "center"}}>
          <AppointmentForm.Label
            text="Final score: "
            type="title"
          />
          <br/>
          <div className="scoreText-container">
            <div>
              <div className="scoreMainText">
                {appointmentData.homeTeam.teamName}
              </div>
              {appointmentData.homeTeam.lineup
              .map((player, i) => {
                if(player.scoredGoals) {
                  return <p key={i} className="scoreInfoText">{player.playerName + " x" + player.scoredGoals}</p>;
                } else {
                  return <p key={i} className="scoreInfoText"/>;
                }
              })}
            </div>
            <div>
              <div className="scoreMainText">
                {homeScore + " - " + awayScore}
              </div>
              <img src="http://ssl.gstatic.com/onebox/sports/soccer_timeline/soccer-ball-retina.png" alt="ball" className="ball-image"/>
            </div>
            <div>
              <div className="scoreMainText">
                {appointmentData.awayTeam.teamName}
              </div>
              {appointmentData.awayTeam.lineup
              .map((player, i) => {
                if(player.scoredGoals) {
                  return <p key={i} className="scoreInfoText">{player.playerName + " x" + player.scoredGoals}</p>;
                } else {
                  return <p key={i} className="scoreInfoText"/>;
                }
              })}
            </div>
          </div>
          {/* CARDS */}
          <div className="scoreText-container">
            <div>
              {appointmentData.homeTeam.lineup
              .map((player, i) => {
                if(player.redCards) {
                  return <p key={i} className="scoreInfoText">{player.playerName}</p>;
                } else {
                  return <p key={i} className="scoreInfoText">    </p>;
                }
              })}
            </div>
            <img src="http://ssl.gstatic.com/onebox/sports/soccer_timeline/red-card-right.svg" alt="ball" className="ball-image"/>
            <div>
              {appointmentData.awayTeam.lineup
              .map((player, i) => {
                if(player.redCards) {
                  return <p key={i} className="scoreInfoText">{player.playerName}</p>;
                } else {
                  return <p key={i} className="scoreInfoText"/>;
                }
              })}
            </div>
          </div>
          {/* YELLOW CARDS */}
          <div className="scoreText-container">
            <div>
              {appointmentData.homeTeam.lineup
              .map((player, i) => {
                if(player.yellowCards) {
                  return <p key={i} className="scoreInfoText">{player.playerName+ " x" + player.yellowCards}</p>;
                } else {
                  return <p key={i} className="scoreInfoText">    </p>;
                }
              })}
            </div>
            <img src="http://ssl.gstatic.com/onebox/sports/soccer_timeline/yellow-card-right.svg" alt="ball" className="ball-image"/>
            <div>
              {appointmentData.awayTeam.lineup
              .map((player, i) => {
                if(player.yellowCards) {
                  return <p key={i} className="scoreInfoText">{player.playerName+ " x" + player.yellowCards}</p>;
                } else {
                  return <p key={i} className="scoreInfoText"/>;
                }
              })}
            </div>
          </div>
        </div>;
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
          <br/>
          <br/>
          <br/>
          {resultText}
      </AppointmentForm.BasicLayout>
    );
};
export const BooleanEditor = props => {
      if(props.label === 'All Day' || props.label === 'Repeat') {
            //returns null, to hide all day and repeat option 
            return null;
      } else {
            return <AppointmentForm.BooleanEditor {...props} />;
      }
};

export const CommandLayout = ({ onCommitButtonClick, ...restProps }) => {
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
export const ConfLayout = ({handleConfirm, ...restProps }) => {
  //function to make isAppointmentBeingCreated value go back to defult : false -> it keeps updating existing events disallowed
  const forceRefresh = () => {
    window.location.reload();
  }
  return (
      <ConfirmationDialog.Layout
          handleConfirm={() => {handleConfirm(); forceRefresh();}}
          {...restProps}
      />
  )
}

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