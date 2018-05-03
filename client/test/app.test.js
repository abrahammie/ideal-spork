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
import { Task } from '../src/task.jsx';

configure({ adapter: new Adapter() });


describe('Component: App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('renders a snapshot', () => {
    const snap = renderer.create(<App/>).toJSON();
    expect(snap).toMatchSnapshot();
  });
});


describe('Component: NewTaskInput', () => {
  it('renders error state', () => {
    const errSnap = shallow(<NewTaskInput formError={true} />);
    expect(errSnap).toMatchSnapshot();
  });
});


describe('Component: TaskList', () => {
  it('renders task', () => {
    const task = { id: 111, completed: false, name: 'Pick up dry cleaning', description: '456 Gold St.', date: moment() };
    const rendered = renderer.create(
      <Task {...task} />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});


describe('Component: Task', () => {
  it('renders as completed', () => {
    const task = { id: 101, completed: true, name: 'Drive Bob to airport', description: 'Laguardia, at 5am', date: moment() };
    const rendered = renderer.create(
      <Task {...task} />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});


describe('Component: Alert', () => {
  it('renders with correct count', () => {
    const tasks = [
      {
        id: 102,
        name: 'Pick up dry cleaning',
        description: '456 Gold St.',
        completed: false,
        date: moment('2018-04-30T19:43:28.006Z')
      },
      {
        id: 103,
        completed: false,
        name: 'Take dog to groomers',
        description: '',
        date: moment('2018-05-01T19:43:28.006Z')
      }
    ];
    const rendered = mount(<App />);
    rendered.setState({ tasks });
    expect(rendered.find('Alert').text()).toEqual('2 overdue');
  });
});


describe('Component: TaskViewNavigation', () => {
  it('renders with correct view', () => {
    // const rendered = mount(<App />);
    // rendered.setState({ tasks });
    // expect(component.find('Alert').text()).toEqual('2 overdue');
    // expect(rendered.toJSON()).toMatchSnapshot();
  });
});


describe('App functionality:', () => {
  const inputTask = [{
    inputName: 'Buy groceries',
    inputDescription: 'eggs, milk, bread',
    inputDate: moment(),
  }];

  it('should pass value to the handleChange function', () => {
    const component = mount(<App />);
    component.find('input#inputName').simulate('change', { target: {
      value: 'change function' }
    });
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should add task based on input values', () => {
    const component = mount(<App />);
    const preventDefault = jest.fn();
    component.setState({ inputTask });
    component.find('form').simulate('submit', { preventDefault });
    expect(toJson(component)).toMatchSnapshot();
    expect(preventDefault).toBeCalled();
  });

  it('sends task data and renders task', () => {
    const wrapper = mount(<App />);
    wrapper.setState({ inputTask });
    const submitButton = wrapper.find('button.ui.yellow.mini.compact.button');
    // nock lets us mock the network
    nock(`http://${document.location.hostname}:3001/api`).post('/add').reply(200);
    submitButton.simulate('click');
  });

  const startState = { tasks: [{ id: 22, name: 'Feed Sara\'s cat', completed: true, description: 'Food is in the top cabinet', date: moment().add(2, 'days') }]};

  it('deletes a task', () => {
    const wrapper = mount(<App />);
    wrapper.setState({ startState });
    const deleteButton = wrapper.find('button.ui.mini.compact.button');
    // nock lets us mock the network
    nock(`http://${document.location.hostname}:3001/api`).delete('/delete').reply(200);
    deleteButton.simulate('click');
  });
});

