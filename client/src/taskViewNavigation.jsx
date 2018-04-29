import React from 'react';
import { Segment, Grid, Menu } from 'semantic-ui-react';
import { TaskList } from './taskList.jsx';

export const TaskViewNavigation = (props) => {
  const { handleItemClick, view, tasks } = props;
  return (
    <Segment>
      <Grid>
        <Grid.Column width={5}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name="All Incomplete"
              active={view === 'All Incomplete'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="Due Today Or Tomorrow"
              active={view === 'Due Today Or Tomorrow'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="Overdue"
              active={view === 'Overdue'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="Completed"
              active={view === 'Completed'}
              onClick={handleItemClick}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <TaskList
            view={view}
            tasks={tasks}
           />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};
