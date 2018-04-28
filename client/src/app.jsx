import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { TaskSheet } from './taskSheet.jsx';

const style = {
  mainDisplay: {
    margin: '40px 40px',
  },
};

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          name: 'pick up laundry',
          description: '123 gold st.',
          date: moment(),
        }
      ],
    };
  };

  render() {
    return (
    <div style={style.mainDisplay}>
      <TaskSheet {...this.state} />
    </div>
    );
  };
};


ReactDOM.render(<App/>, document.getElementById('app'));
