import React from 'react';
import moment from 'moment';
import { Segment } from 'semantic-ui-react';
import { Card } from 'semantic-ui-react';
import { Alert } from './alert.jsx';
import { NewTaskInput } from './newTaskInput.jsx';

export const TaskSheet = (props) => {
  console.log('Props in TaskSheet',props)
  const todaysDate = moment();
  const tomorrow = moment().add(1, 'days');

  // get totals for tasks due today/tomorrow
  const tasksDueSoon = props.tasks.reduce((obj, task) => {
    if (task.date.isSame(todaysDate, 'day')) {
      console.log('today')
      obj.today = obj.today ? ++obj.today : 1;
    } else if (task.date.isSame(tomorrow, 'day')) {
      obj.tomorrow = obj.tomorrow ? ++obj.tomorrow : 1;
    };
    return obj;
  },{});

  return (
    <div>
      <Segment raised>
        <h1>My Tasks</h1>
        <Card.Group itemsPerRow={2}>
        {tasksDueSoon.today ?
          (<Alert num={tasksDueSoon.today} day="today"/>) : null}
        {tasksDueSoon.tomorrow ?
          (<Alert num={tasksDueSoon.tomorrow} day="tomorrow"/>) : null}
        </Card.Group>
        <br/>
        <NewTaskInput/>
      </Segment>
    </div>
  );
};