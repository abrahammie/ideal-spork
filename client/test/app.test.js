import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
// import toJson from 'enzyme-to-json';
// import { shallow } from 'enzyme';
import { App } from '../src/app.jsx';

describe('Component: App', () => {
  const tasks = ['walk the dog', 'make my bed', 'do the dishes'];

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('renders a snapshot', () => {
    const tree = renderer.create(<App/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

});