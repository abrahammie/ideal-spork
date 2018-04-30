import React from 'react';
import { Segment, Grid, Menu } from 'semantic-ui-react';
import { TaskList } from './taskList.jsx';

const style = {
  segment: {
    minHeight: 330,
  },
};

export const TaskViewNavigation = (props) => {
  const { handleItemClick, view } = props;
  return (
    <Segment
      style={style.segment}>
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
        <Grid.Column stretched width={11}>
          <TaskList
            {...props}
           />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};
