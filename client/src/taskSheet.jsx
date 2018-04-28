import React from 'react';
import moment from 'moment';
import { Segment } from 'semantic-ui-react';
import { Alert } from './alert.jsx';
import { NewTaskInput } from './newTaskInput.jsx';

export const TaskSheet = (props) => {
  console.log(props)

/*
  // get totals for tasks due today/tomorrow
  const tasksDueSoon = props.tasks.reduce((obj, task) => {
    if ((todaysDate - task.date) < 24hours) {
      obj.today = obj.today ? ++obj.today : 1;
    } else if ((todaysDate - task.date) < 48hours) {
      obj.today = obj.tomorrow ? ++obj.tomorrow : 1;
    };
    return obj;
  },{});
*/
  return (
    <div>
      <Segment raised>
        <h1>My Tasks</h1>
        {/*tasksDueSoon.today ? (<Alert num={tasksDueSoon.today} day="today"/>) : null*/}
        {/*tasksDueSoon.tomorrow ? (<Alert num={tasksDueSoon.tomorrow} day="tomorrow"/>) : null*/}
        <NewTaskInput/>
      </Segment>
    </div>
  );
};