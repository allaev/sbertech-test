import React from 'react';
import Earth from './Earth';
import earthImage from '../assets/earth.svg';
import { shallow } from 'enzyme';

describe("Tests for the Earth component", () => {
  it("Correctly renders into the DOM", () => {
      shallow(<Earth src={earthImage} />);
  });

  it("Expects to find an image in the DOM", () => {
      const wrapper = shallow(<Earth src={earthImage} />)
      expect(wrapper.find('img')).toHaveLength(1);
  });

  it("Expects to find an image with className Earth in the DOM", () => {
      const wrapper = shallow(<Earth src={earthImage} />)
      expect(wrapper.find('img.Earth')).toHaveLength(1);
  });
});