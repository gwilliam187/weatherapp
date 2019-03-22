import citiesErrorMessageReducer from '../../reducers/citiesErrorMessageReducer';

describe('citiesErrorMessageReducer', () => {
	test('Handles ALLES_GUT', () => {
		const state = undefined;
		const action = {
			type: 'ALLES_GUT'
		};
		const expectedState = '';

		expect(citiesErrorMessageReducer(state, action)).toEqual(expectedState);
	});

	test('Handles CITY_NOT_FOUND', () => {
		const state = undefined;
		const action = {
			type: 'CITY_NOT_FOUND',
			payload: 'asdf'
		};
		const expectedState = 'asdf not found';

		expect(citiesErrorMessageReducer(state, action)).toEqual(expectedState);
	});

	test('Handles INVALID_INPUT', () => {
		const state = undefined;
		const action = {
			type: 'INVALID_INPUT'
		};
		const expectedState = 'Invalid input';

		expect(citiesErrorMessageReducer(state, action)).toEqual(expectedState);
	});
});