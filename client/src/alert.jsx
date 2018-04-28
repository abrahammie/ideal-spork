import React from 'react';
import { Card } from 'semantic-ui-react';

export const Alert = (props) => {
  console.log('Alert props', props) // num tasks, today/tomorrow

  return (
    <Card
      href=''
      header={`${props.num} tasks due ${props.day}`}
    />
  );
};