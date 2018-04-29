import React from 'react';
import { Segment } from 'semantic-ui-react';
import moment from'moment';
import { Task } from'./task.jsx';

export const TaskList = (props) => {
  const { view, tasks } = props;

  // map list of tasks based on view
  if (view === 'All Incomplete') {
    return (
      tasks.map((item, index) => {
        if (!item.completed) {
          return (
            <Task
              key={index}
              name={item.name}
              description={item.description}
              date={item.date}
            />
          );
        }
      })
    );
  } else if (view === 'Due Today Or Tomorrow') {
    return (
      tasks.map((item, index) => {
        let due = item.date.calendar(null, {
           sameDay: '[Today]',
           nextDay: '[Tomorrow]'
        });
        if (!item.completed && (due === 'Today' || due === 'Tomorrow')) {
          return (
            <Task
              key={index}
              name={item.name}
              description={item.description}
              date={item.date}
            />
          );
        }
      })
    );
  } else if (view === 'Overdue') {
    return (
      tasks.map((item, index) => {
        if (!item.completed && item.date.isBefore(moment(), 'day')) {
          return (
            <Task
              key={index}
              name={item.name}
              description={item.description}
              date={item.date}
            />
          );
        }
      })
    );
  } else if (view === 'Completed') {
    return (
      tasks.map((item, index) => {
        if (item.completed) {
          return (
            <Task
              key={index}
              name={item.name}
              description={item.description}
              date={item.date}
            />
          );
        }
      })
    );
  }
  return null;
};
