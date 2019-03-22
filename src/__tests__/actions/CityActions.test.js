import configureStore from 'redux-mock-store';

import { selectCity, removeCity } from '../../actions/CityActions';

const mockStore = configureStore();
const store = mockStore();

describe('cityActions', () => {
	beforeEach(() => {
		store.clearActions();
	});

	test('Handles SELECT_CITY', () => {
		const city = 
		{
			cityName: 'Berlin',
			countryCode: 'de'
		};
		store.dispatch(selectCity(city));
		
		const actualActions = store.getActions();
		const expectedActions = 
		[
			{ 
				type: 'SELECT_CITY',
        payload: { 
        	cityName: 'Berlin', 
        	countryCode: 'de' 
        } 
      }
		];

		expect(actualActions).toEqual(expectedActions);
		// expect(store.getActions()).toMatchSnapshot();
	});

	test('Handles REMOVE_CITY', () => {
		const city = 
		{
			cityName: 'Berlin',
			countryCode: 'de'
		};
		store.dispatch(removeCity(city));

		const actualActions = store.getActions();
		const expectedActions = 
		[
			{ 
				type: 'REMOVE_CITY',
        payload: { 
        	cityName: 'Berlin', 
        	countryCode: 'de' 
        } 
      }
		];

		expect(actualActions).toEqual(expectedActions);
	});
});