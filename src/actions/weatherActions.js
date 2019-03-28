import openWeather from '../apis/openWeatherAPI';

export const fetchWeather = (city) => {
	return async (dispatch) => {
		const res = await openWeather
			.get(`?q=${city.cityRef}`)
			.catch(error => { 
				return {
					city: city, 
					message: `${city.cityRef} doesn't exist` 
				} 
			});
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