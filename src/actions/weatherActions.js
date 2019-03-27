import openWeather from '../apis/openWeatherAPI';

export const fetchWeather = (cityRef) => {
	return async (dispatch) => {
		const res = await openWeather
			.get(`?q=${cityRef}`)
			.catch(error => { return {message: `${cityRef} doesn't exist`} });
		const data = await res;

		return data;
	}
};

export const setWeathers = weathers => {
	return {
		type: 'FETCH_WEATHERS',
		payload: weathers
	};
};