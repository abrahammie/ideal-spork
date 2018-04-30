import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

const style = {
  'due soon': {
    color: 'gold',
    align: 'center',
  },
  overdue: {
    color: 'crimson',
  },
  card: {
    maxWidth: 100,
    textAlign: 'center',
    color: 'black',
    fontSize: '1.1em',
    paddingTop: 5,
  },
};

export const Alert = (props) => {
  const { label, num, when, handleItemClick, icon } = props;
  return (
    <Card
      style={style.card}
      onClick={handleItemClick}
      name={label}>
      {`${num} ${when}`}
      <Icon
        fitted
        name={icon}
        size="big"
        style={style[when]}
        />
    </Card>
  );
};
