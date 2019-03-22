import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { CityButton } from '../../components/CityButton';

describe('<CityButton />', () => {
  let wrapper;
  const mockSelectCity = jest.fn();
  const mockUpdateCitiesErrorMessage = jest.fn();
  const mockOnClick = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
    	<CityButton 
    		selectCity={mockSelectCity} 
    		updateCitiesErrorMessage={mockUpdateCitiesErrorMessage} />
    );
  });

  test('Handles onClick', () => {
  	wrapper.find('button').simulate('click');
  	expect(mockSelectCity).toHaveBeenCalled();
  	expect(mockUpdateCitiesErrorMessage).toHaveBeenCalled();
  });

	test('Renders the component', () => {
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});