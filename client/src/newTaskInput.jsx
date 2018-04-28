import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Segment } from 'semantic-ui-react';


export const NewTaskInput = (props) => {

  return (
    <div>
      <Segment raised>
          <DatePicker
            selected={moment()}
            //onChange={this.changeDate}
            placeholderText="Click to select date"
          />
      </Segment>
    </div>
  );
};
