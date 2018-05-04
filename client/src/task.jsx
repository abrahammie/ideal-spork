import React from 'react';
import { Segment, Card, Icon, Button } from 'semantic-ui-react';

const style = {
  button: {
    backgroundColor: 'white',
    margin: 1,
    padding: 8,
  },
  content: {
    paddingBottom: 7,
  },
  buttons: {
    border: '1px solid #d4d4d5',
  },
  segment: {
    margin: 0,
  },
  overdue: {
    paddingBottom: 7,
    backgroundColor: '#ed143d2e',
  },
  dueSoon: {
    paddingBottom: 7,
    backgroundColor: '#ffd70033'
  },
};

export const Task = props => {
  const {
    name,
    description,
    date,
    _id,
    completed,
    deleteTask,
    completeTask,
    taskStyle,
  } = props;

  return (
    <Segment
      basic
      style={style.segment}>
      <Card>
        <Card.Content
          style={style[taskStyle]}>
          <Card.Header>{name}</Card.Header>
          <Card.Content>{description}</Card.Content>
          <Card.Meta>{`Due ${date.calendar(null, {
            sameDay: "[Today]",
            nextDay: "[Tomorrow]",
            nextWeek: "dddd",
            lastDay: "[Yesterday]",
            lastWeek: "[Last] dddd",
            sameElse: "MMMM Do YYYY"
          })}`}</Card.Meta>
        </Card.Content>
        <Button.Group
          style={style.buttons}>
          {completed ? null :
            (<Button
              compact
              id={_id}
              size="mini"
              style={style.button}
              onClick={completeTask}>
              <Icon
                name="check circle"
                color="green"
              /> done
            </Button>)
          }
          <Button
            compact
            id={_id}
            size="mini"
            style={style.button}
            onClick={deleteTask}>
            <Icon
              name="trash"
              color="red"
            /> delete
          </Button>
        </Button.Group>
      </Card>
    </Segment>
  );
};


