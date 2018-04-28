import React from 'react';
import { Card } from 'semantic-ui-react';

export const Alert = (props) => {
  console.log('Alert props', props) // num tasks, today/tomorrow

  return (
    <Card
      //href=''
      color="yellow"
      header={props.num}
      description={`tasks due ${props.day}`}
    />
  );
};