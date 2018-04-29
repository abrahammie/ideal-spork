import React from 'react';
import { Segment, Card } from 'semantic-ui-react';

export const Task = (props) => {
  return (
    <Segment basic>
      <Card centered>
        <Card.Content>
          <Card.Header>{props.name}</Card.Header>
          <Card.Content>{props.description}</Card.Content>
          <Card.Meta>{`Due ${props.date.calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'MMMM Do YYYY'
          })}`}</Card.Meta>
        </Card.Content>
      </Card>
    </Segment>
  );
};