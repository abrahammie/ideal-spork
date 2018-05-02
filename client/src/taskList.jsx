import React from 'react';
import moment from'moment';
import { Segment } from 'semantic-ui-react';
import { Task } from'./task.jsx';

const compare = (a, b) => {
  return a.date.valueOf() - b.date.valueOf();
};

export const TaskList = (props) => {
  const { view, tasks, completeTask, deleteTask, isDueSoon, isOverdue } = props;

  // map list of tasks based on view
  if (view === 'All Incomplete') {
    return (
      tasks.sort(compare).map((item) => {
        if (!item.completed) {
          return (
            <Task
              key={item.id}
              dueSoon={isDueSoon(item)}
              overdue={isOverdue(item)}
              completeTask={completeTask}
              deleteTask={deleteTask}
              {...item}
            />
          );
        }
      })
    );
  } else if (view === 'Due Today Or Tomorrow') {
    return (
      tasks.sort(compare).map((item) => {
        if (!item.completed && isDueSoon(item)) {
          return (
            <Task
              key={item.id}
              completeTask={completeTask}
              deleteTask={deleteTask}
              dueSoon={true}
              {...item}
            />
          );
        }
      })
    );
  } else if (view === 'Overdue') {
    return (
      tasks.sort(compare).map((item) => {
        if (!item.completed && isOverdue(item)) {
          return (
            <Task
              key={item.id}
              completeTask={completeTask}
              deleteTask={deleteTask}
              overdue={true}
              {...item}
            />
          );
        }
      })
    );
  } else if (view === 'Completed') {
    return (
      tasks.sort(compare).map((item) => {
        if (item.completed) {
          return (
            <Task
              key={item.id}
              deleteTask={deleteTask}
              {...item}
            />
          );
        }
      })
    );
  }
  return null;
};
