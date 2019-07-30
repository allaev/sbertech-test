import React from 'react';
import Button from './Button';
import { shallow } from 'enzyme';

describe("Tests for the Button component", () => {
  it("Correctly renders into the DOM", () => {
      shallow(<Button text="Запуск" />);
  });

  it("Expects to find a button in the DOM", () => {
      const wrapper = shallow(<Button text="Запуск" />)
      expect(wrapper.find('button')).toHaveLength(1);
  });

  it("Expects to find a button with className Button in the DOM", () => {
      const wrapper = shallow(<Button text="Запуск" className="Button" />)
      expect(wrapper.find('button.Button')).toHaveLength(1);
  });

  it("Expects to run onClick function when the button is pressed in the DOM", () => {
    const mockCallBackClick = jest.fn();
    const wrapper = shallow(<Button text="Запуск" onClick={mockCallBackClick} className="Button" />);
    wrapper.find('button').simulate('click');
    expect(mockCallBackClick.mock.calls.length).toEqual(1);
  });
});