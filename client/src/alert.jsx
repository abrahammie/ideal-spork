import React from 'react';
import { Card } from 'semantic-ui-react';

export const Alert = (props) => {
  return (
    <Card
      color="yellow"
      header={props.num}
      description={`tasks due ${props.day}`}
    />
  );
};