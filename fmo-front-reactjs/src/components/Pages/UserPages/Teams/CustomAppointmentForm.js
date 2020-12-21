import React from 'react';


import {
  AppointmentForm
} from '@devexpress/dx-react-scheduler-material-ui';

import {
    messages, 
    TextEditor, 
    BasicLayout, 
    BooleanEditor,
    CommandLayout,
    ResourceEditor,
    CaptainResourceEditor
} from "./TeamCalendarCustoms";

export default class CustomAppointmentForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
  
    render() {
      return (
        <AppointmentForm
                
            readOnly={this.props.isAppointmentBeingCreated ? false : !this.props.allowUpdating}

            basicLayoutComponent={BasicLayout}
            textEditorComponent={TextEditor}
            messages={messages}
            booleanEditorComponent={BooleanEditor}

            commandLayoutComponent={CommandLayout}
            resourceEditorComponent={this.props.isCaptain ? CaptainResourceEditor : ResourceEditor}
        />
      );
    }
  }
  