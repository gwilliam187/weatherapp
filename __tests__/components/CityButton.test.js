import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import CityButton from '../../components/CityButton';

describe('<CityButton />', () => {
	describe('render()', () => {
		test('renders the component', () => {
			const wrapper = shallow(<CityButton />);
			const component = wrapper.dive();

			expect(toJson(component).toMatchSnapshot());
		})
	})
})