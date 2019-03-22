import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { CityInput } from '../../components/CityInput';

describe('<CityInput />', () => {
	let wrapper;
	const mockSelectCity = jest.fn();
  const mockUpdateCitiesErrorMessage = jest.fn();

	beforeEach(() => {
		wrapper = shallow(
			<CityInput 
				selectCity={mockSelectCity} 
    		updateCitiesErrorMessage={mockUpdateCitiesErrorMessage} />
    );
	});

	test('Handles onChange', () => {
		const event = {target: {value: 'Hello'}}
		const input = wrapper.find('input');
		
		input.simulate('change', event);

		expect(wrapper.state().term).toEqual('Hello');
	});

	test('Renders the component', () => {
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});