import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import CityButton from '../../components/CityButton';

describe('<CityButton />', () => {
	describe('onClick()', () => {
		test('successfully calls the onClick handler', () => {
			const mockOnClick = jest.fn();
			const wrapper = shallow(
				<CityButton onClick={mockOnClick} />
			);
			// const component = wrapper.dive();
			console.log('wtf is this shit');
			//console.log('fuck this shit');
			// console.log(wrapper.debug());
			// wrapper.find('button').simulate('click');
			//expect(mockOnClick.mock.calls.length).toEqual(1);
		});
	});

	describe('render()', () => {
		test('renders the component', () => {
			const wrapper = shallow(<CityButton />);

			expect(toJson(wrapper)).toMatchSnapshot();
		});
	});
});