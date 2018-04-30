import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import axios from 'axios';
import { Segment, Card } from 'semantic-ui-react';
import { Alert } from './alert.jsx';
import { NewTaskInput } from './newTaskInput.jsx';
import { TaskViewNavigation } from './taskViewNavigation.jsx';

const style = {
  mainDisplay: {
    margin: '40px auto',
    maxWidth: 900,
  },
  segment: {
    backgroundColor: 'rgba(243, 240, 240, 0.75)',
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
        // {
        //   id: 12345,
        //   name: 'walk the dog',
        //   description: 'benny',
        //   date: moment(),
        //   completed: false,
        // },
        // {
        //   id: 123456,
        //   name: 'pick up laundry',
        //   description: '123 gold st.',
        //   date: moment().subtract(12, 'days'),
        //   completed: false,
        // },
        // {
        //   id: 123457,
        //   name: 'build an app',
        //   description: 'Lorem ipsum dolor sit amet, ea est malorum vituperatoribus. Eirmod democritum omittantur ne sit, dolorum vocibus interesset et mei. Nam zril tamquam delicata te. Simul ubique iudicabit ei mea. Sit an rebum aliquando. Nec electram efficiantur ei, mei esse paulo contentiones ea. In vel posse percipit efficiendi, ridens nostro omittantur his ad. Ius integre salutandi mediocritatem ea, mutat tantas eam eu.',
        //   date: moment().add(1, 'days'),
        //   completed: false,
        // },
        // {
        //   id: 123458,
        //   name: 'pick up groceries',
        //   description: 'tomato, potato',
        //   date: moment().add(1, 'days'),
        //   completed: false,
        // },
        // {
        //   id: 123459,
        //   name: 'call bob',
        //   description: '212-123-4567',
        //   date: moment().add(4, 'days'),
        //   completed: false,
        // },
        // {
        //   id: 123450,
        //   name: 'do the dishes',
        //   description: 'or not',
        //   date: moment().subtract(1, 'days'),
        //   completed: false,
        // },
        // {
        //   id: 1234511,
        //   name: 'walk the dog',
        //   description: 'rusty',
        //   date: moment().subtract(8, 'days'),
        //   completed: true,
        // }
      ],
    };
    this.submitTask = this.submitTask.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  };

  componentWillMount() {
    // get tasks from api on mount
    axios.get(`${process.env.TASK_SERVICE_URL}/api/getTasks`)
      .then(res => this.setState({ tasks: res.tasks },
        () => console.log(this.state.tasks)))
      .catch(err => console.log(err));
  }

  submitTask() {
    this.setState({ formError: false });
    // check for required fields
    if (this.state.inputName && this.state.inputDate) {
      axios.post(`${process.env.TASK_SERVICE_URL}/api/add`,
        {
          newTask: {
            name: this.state.inputName,
            description: this.state.inputDescription,
            date: this.state.inputDate,
          }
        })
        .then(res => this.setState(
          {
            tasks: res.tasks,
            inputName: null,
            inputDescription: null,
            inputDate: null,
          }
        ))
        .catch(err => console.log(err));
    } else {
      this.setState({ formError: true });
    }
  }

  changeDate(date) {
    this.setState({
      inputDate: date,
    });
  };

  // toggle task view
  handleItemClick(e, { name }) {
    this.setState({ view: name });
  }

  handleChange(e) {
    // passed to newTaskInput form fields
    const obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }

  completeTask(taskId) {
    console.log('complete task called')
    axios.post(`${process.env.TASK_SERVICE_URL}/api/complete`, { taskId })
      .then(res => this.setState({ tasks: res.tasks }))
      .catch(err => console.log(err));
  }

  deleteTask(taskId) {
    // trigger a confirm?
    axios.delete(`${process.env.TASK_SERVICE_URL}/api/delete`, { taskId })
      .then(res => this.setState({ tasks: res.tasks }))
      .catch(err => console.log(err));
  }

  // check if due today or tomorrow
  isDueSoon(taskItem) {
    const todaysDate = moment();
    const tomorrow = moment().add(1, 'days');
    return !taskItem.completed &&
      (taskItem.date.isSame(todaysDate, 'day') ||
      taskItem.date.isSame(tomorrow, 'day'));
  }

  // check if overdue
  isOverdue(taskItem) {
    return !taskItem.completed &&
      taskItem.date.isBefore(moment(), 'day');
  }

  render() {
    const { tasks, inputDate, inputName, inputDescription, formError, view } = this.state;

    // get totals for tasks due soon or overdue
    const tasksDue = tasks.reduce((obj, task) => {
      if (this.isDueSoon(task)) {
        obj.soon = obj.soon ? ++obj.soon : 1;
      } else if (this.isOverdue(task)) {
        obj.overdue = obj.overdue ? ++obj.overdue : 1;
      };
      return obj;
    },{});

    return (
      <div
        style={style.mainDisplay}>
        <Segment
          style={style.segment}
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
            {tasksDue.soon ?
              (<Alert
                label="Due Today Or Tomorrow"
                icon="wait"
                handleItemClick={this.handleItemClick}
                num={tasksDue.soon}
                when="due soon"/>)
              : null}
            {tasksDue.overdue ?
              (<Alert
                label="Overdue"
                icon="warning sign"
                handleItemClick={this.handleItemClick}
                num={tasksDue.overdue}
                when="overdue"/>)
              : null}
          </Card.Group>
          <br/>
          <NewTaskInput
            inputDate={inputDate}
            inputName={inputName}
            inputDescription={inputDescription}
            changeDate={this.changeDate}
            submitTask={this.submitTask}
            handleChange={this.handleChange}
            formError={formError}
          />
          <br/>
          <TaskViewNavigation
            view={view}
            handleItemClick={this.handleItemClick}
            tasks={tasks}
            completeTask={this.completeTask}
            deleteTask={this.deleteTask}
            isDueSoon={this.isDueSoon}
            isOverdue={this.isOverdue}
          />
        </Segment>
      </div>
    );
  };
};

ReactDOM.render(<App/>, document.getElementById('app'));
