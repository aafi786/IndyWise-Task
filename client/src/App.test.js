import React from 'react';
import { render } from '@testing-library/react';
import Home from './components/Home';
import Profile from './components/Profile';
import { configure, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('Testing Home Component', () => {
  const wrapper = shallow(<Home />);
  test('Render Page Title', () => {
    expect(wrapper.find("h1").text()).toContain("Indywise");

  });
  test("Home Component SnapShot", () => {
    const component = renderer.create(<Home />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
describe('Testing Profile Component', () => {

  const wrapper = shallow(
    <Profile
      required={true}
      match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
    />
  );
  test('Render Page Title', () => {
    const component = renderer.create(
      <Profile
        required={true}
        match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Initial Date', () => {
    expect(wrapper.find("#date").text()).toContain("");
  })
  test('Initial Time', () => {
    expect(wrapper.find("#time").text()).toContain("");
  })


});




