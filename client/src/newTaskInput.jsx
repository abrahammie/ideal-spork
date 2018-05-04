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
  head: {
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
  },
};

export const NewTaskInput = (props) => {
  const {
    formError,
    inputName,
    inputDescription,
    inputDate,
    submitTask,
    handleChange,
    changeDate,
  } = props;

  return (
    <div>
      <Segment
        raised
        style={style.bg}>
          <Header
            style={style.head}
            as="h4">
            Add a task:
          </Header>
        <Form
          size="tiny"
          error={formError}>
          <Form.Group>
            <Form.Field
              width={5}
              control={Input}
              value={inputName}
              id="inputName"
              label="Task name"
              onChange={handleChange}
            />
            <Form.Field
              width={8}
              control={Input}
              value={inputDescription}
              id="inputDescription"
              label="Description"
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
            style={style.button}
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

