import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import nock from 'nock';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';
import { App } from '../src/app.jsx';
import { NewTaskInput } from '../src/newTaskInput.jsx';
import { TaskList } from '../src/taskList.jsx';
import { Task } from '../src/task.jsx';

configure({ adapter: new Adapter() });


describe('Component: App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('renders a snapshot', () => {
    const component = renderer.create(<App/>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});


describe('Component: NewTaskInput', () => {
  it('renders non-error state', () => {
    const component = shallow(<NewTaskInput />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('renders error state', () => {
    const errComponent = shallow(
      <NewTaskInput formError={true} />
      );
    expect(toJson(errComponent)).toMatchSnapshot();
  });
});


describe('Component: TaskList', () => {
  it('renders correct task view', () => {
    const tasks = [{
      id: 100,
      completed: false,
      name: 'Do homework',
      description: 'algebra',
      date: moment().subtract(2, 'days')
    }];
    const rendered = mount(<App />);
    rendered.setState({ view: 'Overdue' });
    expect(rendered.find('TaskList').props().view).toBe('Overdue');
  });

  it('renders default view', () => {
    const component = shallow(<TaskList />);
    expect(toJson(component)).toMatchSnapshot();
  });
});


describe('Component: Task', () => {
  it('renders as completed', () => {
    const task = {
      id: 101,
      completed: true,
      name: 'Drive Bob to airport',
      description: 'Laguardia, at 5am',
      date: moment()
    };
    const component = shallow(
      <Task {...task} />
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});


describe('Component: Alert', () => {
  const tasks = [
    {
      id: 102,
      name: 'Pick up dry cleaning',
      description: '456 Gold St.',
      completed: false,
      date: moment().subtract(2, 'days')
    },
    {
      id: 103,
      name: 'Take dog to groomers',
      description: '',
      completed: false,
      date: moment().subtract(3, 'days')
    }
  ];
  it('renders with correct count', () => {
    const rendered = mount(<App />);
    rendered.setState({ tasks });
    expect(rendered.find('Alert').text()).toEqual('2 overdue');
  });
});


describe('App functionality:', () => {
  const inputTask = [{
    inputName: 'Buy groceries',
    inputDescription: 'eggs, milk, bread',
    inputDate: moment(),
  }];

  it('should pass value to the handleChange function', () => {
    const rendered = mount(<App />);
    rendered.find('input#inputName').simulate('change', { target: {
      value: 'change function' }
    });
    expect(toJson(rendered)).toMatchSnapshot();
  });

  it('should add task based on input values', () => {
    const rendered = mount(<App />);
    const preventDefault = jest.fn();
    rendered.setState({ inputTask });
    rendered.find('form').simulate('submit', { preventDefault });
    expect(toJson(rendered)).toMatchSnapshot();
    expect(preventDefault).toBeCalled();
  });

  it('sends task data and renders task', () => {
    const rendered = mount(<App />);
    rendered.setState({ inputTask });
    const submitButton = rendered.find('button.ui.yellow.mini.compact.button');
    // nock lets us mock the http response
    nock(`http://${document.location.hostname}:3001/api`).post('/add').reply(200);
    submitButton.simulate('click');
  });

  const startState = {
    tasks: [{
      id: 22,
      name: 'Feed Sara\'s cat',
      completed: true,
      description: 'Food is in the top cabinet',
      date: moment().add(2, 'days')
    }]};

  it('deletes a task', () => {
    const rendered = mount(<App />);
    rendered.setState({ startState });
    const deleteButton = rendered.find('button.ui.mini.compact.button');
    nock(`http://${document.location.hostname}:3001/api`).delete('/delete').reply(200);
    deleteButton.simulate('click');
    expect(rendered.find('Task')).toHaveLength(0);
  });
});

