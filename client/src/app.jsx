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
          name: 'walk the dog',
          description: '',
          date: moment(),
        },
        {
          name: 'pick up laundry',
          description: '123 gold st.',
          date: moment().subtract(6, 'hours'),
        },
        {
          name: 'build an app',
          description: 'Lorem ipsum dolor sit amet, ea est malorum vituperatoribus. Eirmod democritum omittantur ne sit, dolorum vocibus interesset et mei. Nam zril tamquam delicata te. Simul ubique iudicabit ei mea. Sit an rebum aliquando. Nec electram efficiantur ei, mei esse paulo contentiones ea. In vel posse percipit efficiendi, ridens nostro omittantur his ad. Ius integre salutandi mediocritatem ea, mutat tantas eam eu. An nec alii quaestio, sit ea reque vitae. Suas ipsum gubergren ut his, te eum porro eligendi. His oblique fastidii ad. Ad vis eirmod voluptua. Has et verterem hendrerit. Elit iracundia mel ei. Pro id phaedrum dissentias theophrastus, nam at audiam honestatis scriptorem. Veri graece animal no eam, qui cu copiosae theophrastus. In esse utroque senserit ius, civibus appareat eu duo. Sonet deleniti disputationi mei cu. Populo iuvaret iracundia pri te. Minim equidem lucilius qui no, eu per fuisset repudiandae delicatissimi. Duo nibh omittantur et.',
          date: moment().add(1, 'days'),
        },
        {
          name: 'pick up groceries',
          description: 'tomato, potato',
          date: moment().add(1, 'days'),
        },
        {
          name: 'call bob',
          description: '212-123-4567',
          date: moment().add(2, 'days'),
        },
        {
          name: 'do the dishes',
          description: 'or not',
          date: moment().subtract(1, 'days'),
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
