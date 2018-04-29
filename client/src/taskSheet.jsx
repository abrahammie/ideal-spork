import React from 'react';
import moment from 'moment';
import { Segment } from 'semantic-ui-react';
import { Card } from 'semantic-ui-react';
import { Alert } from './alert.jsx';
import { NewTaskInput } from './newTaskInput.jsx';

export const TaskSheet = (props) => {
  // console.log('Props in TaskSheet',props)
  const todaysDate = moment();
  const tomorrow = moment().add(1, 'days');

  // get totals for tasks due today/tomorrow
  const tasksDueSoon = props.tasks.reduce((obj, task) => {
    if (task.date.isSame(todaysDate, 'day')) {
      obj.today = obj.today ? ++obj.today : 1;
    } else if (task.date.isSame(tomorrow, 'day')) {
      obj.tomorrow = obj.tomorrow ? ++obj.tomorrow : 1;
    };
    return obj;
  },{});

  return (
    <div>
      <Segment
        raised>
        <Card.Group
          itemsPerRow={3}>
          <Card
            color="grey">
            <Card.Content
              textAlign="center">
              <h1>My Tasks</h1>
            </Card.Content>
          </Card>
          {tasksDueSoon.today ?
            (<Alert num={tasksDueSoon.today} day="today"/>) : null}
          {tasksDueSoon.tomorrow ?
            (<Alert num={tasksDueSoon.tomorrow} day="tomorrow"/>) : null}
        </Card.Group>
        <br/>
        <NewTaskInput
          inputDate={props.inputDate}
          inputName={props.inputName}
          inputDescription={props.inputDescription}
          changeDate={props.changeDate}
          formError={props.formError}
        />
      </Segment>
    </div>
  );
};