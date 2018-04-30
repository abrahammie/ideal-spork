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
};

export const Task = props => {
  const { name, description, date, completed, deleteTask, completeTask } = props;
  return (
    <Segment basic>
      <Card>
        <Card.Content
          style={style.content}>
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
