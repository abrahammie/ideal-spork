import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Segment } from 'semantic-ui-react';
import { Button, Form, Message, Header } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';

const style = {
  bg: {
    backgroundColor: '#f1f5ef',
  },
};

export const NewTaskInput = (props) => {
  // console.log('Props in newtaskinput',props)
  return (
    <div>
      <Segment
        raised
        style={style.bg}>
        <Form
          error={props.formError}>
          <Header
            as="h3"
            floated="left">
            Add a task:
          </Header>
          <Form.Group
            size="tiny">
            <Form.Input
              width={4}
              placeholder={props.inputName || 'Task name'}
            />
            <Form.Input
              width={8}
              placeholder={props.inputDescription || 'Description'}
            />
          <DatePicker
            selected={props.inputDate ? props.inputDate : null}
            onChange={props.changeDate}
            placeholderText="Click to select due date"
          />
          </Form.Group>
          <Button
            compact
            color="yellow"
            size="mini">
            Submit
          </Button>
          <Message
            error
            size="mini"
            content='Task name and date are required.'
          />
        </Form>
      </Segment>
    </div>
  );
};
