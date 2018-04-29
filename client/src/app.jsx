import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Segment, Card } from 'semantic-ui-react';
import { Alert } from './alert.jsx';
import { NewTaskInput } from './newTaskInput.jsx';
import { TaskViewNavigation } from './TaskViewNavigation.jsx';

const style = {
  mainDisplay: {
    margin: '40px auto',
    maxWidth: 900,
  },
};

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      inputName: null,
      inputDescription: null,
      inputDate: null,
      formError: false,
      view: 'All Incomplete',
      tasks: [
        {
          name: 'walk the dog',
          description: 'benny',
          date: moment(),
          completed: false,
        },
        {
          name: 'pick up laundry',
          description: '123 gold st.',
          date: moment().subtract(12, 'days'),
          completed: false,
        },
        {
          name: 'build an app',
          description: 'Lorem ipsum dolor sit amet, ea est malorum vituperatoribus. Eirmod democritum omittantur ne sit, dolorum vocibus interesset et mei. Nam zril tamquam delicata te. Simul ubique iudicabit ei mea. Sit an rebum aliquando. Nec electram efficiantur ei, mei esse paulo contentiones ea. In vel posse percipit efficiendi, ridens nostro omittantur his ad. Ius integre salutandi mediocritatem ea, mutat tantas eam eu. An nec alii quaestio, sit ea reque vitae. Suas ipsum gubergren ut his, te eum porro eligendi. His oblique fastidii ad. Ad vis eirmod voluptua. Has et verterem hendrerit. Elit iracundia mel ei. Pro id phaedrum dissentias theophrastus, nam at audiam honestatis scriptorem. Veri graece animal no eam, qui cu copiosae theophrastus. In esse utroque senserit ius, civibus appareat eu duo. Sonet deleniti disputationi mei cu. Populo iuvaret iracundia pri te. Minim equidem lucilius qui no, eu per fuisset repudiandae delicatissimi. Duo nibh omittantur et.',
          date: moment().add(1, 'days'),
          completed: false,
        },
        {
          name: 'pick up groceries',
          description: 'tomato, potato',
          date: moment().add(1, 'days'),
          completed: false,
        },
        {
          name: 'call bob',
          description: '212-123-4567',
          date: moment().add(4, 'days'),
          completed: false,
        },
        {
          name: 'do the dishes',
          description: 'or not',
          date: moment().subtract(1, 'days'),
          completed: false,
        },
        {
          name: 'walk the dog',
          description: 'rusty',
          date: moment().subtract(8, 'days'),
          completed: true,
        }
      ],
    };
    this.changeDate = this.changeDate.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  };

  changeDate(date) {
    this.setState({
      inputDate: date,
    });
  };

  // toggle task view
  handleItemClick(e, { name }) {
    this.setState({ view: name });
  }

  render() {
    const { tasks, inputDate, inputName, inputDescription, formError, view } = this.state;

    const todaysDate = moment();
    const tomorrow = moment().add(1, 'days');

    // get totals for tasks due today/tomorrow
    const tasksDueSoon = tasks.reduce((obj, task) => {
      if (task.date.isSame(todaysDate, 'day')) {
        obj.today = obj.today ? ++obj.today : 1;
      } else if (task.date.isSame(tomorrow, 'day')) {
        obj.tomorrow = obj.tomorrow ? ++obj.tomorrow : 1;
      };
      return obj;
    },{});

    return (
      <div
        style={style.mainDisplay}>
        <Segment
          raised>
          <Card.Group
            itemsPerRow={3}>
            <Card
              color="grey">
              <Card.Content
                textAlign="center">
                <h1>My Tasks</h1>
              </Card.Content>
            </Card>
            {tasksDueSoon.today ?
              (<Alert num={tasksDueSoon.today} day="today"/>) : null}
            {tasksDueSoon.tomorrow ?
              (<Alert num={tasksDueSoon.tomorrow} day="tomorrow"/>) : null}
          </Card.Group>
          <br/>
          <NewTaskInput
            inputDate={inputDate}
            inputName={inputName}
            inputDescription={inputDescription}
            changeDate={this.changeDate}
            formError={formError}
          />
          <br/>
          <TaskViewNavigation
            view={view}
            handleItemClick={this.handleItemClick}
            tasks={tasks}
          />
        </Segment>
      </div>
    );
  };
};

ReactDOM.render(<App/>, document.getElementById('app'));
