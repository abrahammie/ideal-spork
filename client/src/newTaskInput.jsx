import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Segment } from 'semantic-ui-react';
import { Button, Form, Message, Header, Input } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';

const style = {
  bg: {
    backgroundColor: '#f1f5ef',
  },
};

export const NewTaskInput = (props) => {
  const { formError, inputName, inputDescription, inputDate, submitTask, handleChange, changeDate } = props;
  return (
    <div>
      <Segment
        raised
        style={style.bg}>
        <Form
          error={formError}>
          <Header
            as="h3"
            floated="left">
            Add a task:
          </Header>
          <Form.Group
            size="tiny">
            <Form.Field
              width={4}
              control={Input}
              id="inputName"
              placeholder={inputName || 'Task name'}
              onChange={handleChange}
            />
            <Form.Field
              width={8}
              control={Input}
              id="inputDescription"
              placeholder={inputDescription || 'Description'}
              onChange={handleChange}
            />
          <DatePicker
            selected={inputDate ? inputDate : null}
            onChange={changeDate}
            placeholderText="Click to select due date"
          />
          </Form.Group>
          <Button
            compact
            color="yellow"
            size="mini"
            onClick={submitTask}>
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
