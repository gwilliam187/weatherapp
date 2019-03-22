import weathersReducer from '../../reducers/weathersReducer';
import weatherJson from '../json/successOpenWeatherAPI';

describe('weathersReducer', () => {
	test('Handles FETCH_WEATHERS', () => {
		const state = undefined;
		const action = {
			type: 'FETCH_WEATHERS',
			payload: [weatherJson]
		};
		const expectedState = action.payload;

		expect(weathersReducer(state, action)).toEqual(expectedState);
	});
});