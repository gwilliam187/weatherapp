import selectedCitiesReducer from '../../reducers/selectedCitiesReducer';

describe('selectCitiesReducer', () => {
	test('Handles SELECT_CITY', () => {
		const state = undefined;
		const action = {
			type: 'SELECT_CITY',
			payload: {
				cityName: 'Berlin',
				countryCode: 'de'
			}
		};
		const expectedState = 
		[
			{
				cityName: 'Berlin',
				countryCode: 'de'
			}
		];

		expect(selectedCitiesReducer(state, action)).toEqual(expectedState);
	});

	test('Handles REMOVE_CITY', () => {
		const state = 
		[
			{
				cityName: 'Berlin',
				countryCode: 'de'
			}
		];
		const action = {
			type: 'REMOVE_CITY',
			payload: state[0]
		};
		const expectedState = [];

		expect(selectedCitiesReducer(state, action)).toEqual(expectedState);
	});
});