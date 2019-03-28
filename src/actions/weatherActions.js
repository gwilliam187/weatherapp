import openWeather from '../apis/openWeatherAPI';

export const fetchWeather = city => async dispatch => {
	return await openWeather
		.get(`?q=${city.cityRef}`)
		.catch(error => { 
			return {
				city: city, 
				message: `${city.cityRef} doesn't exist` 
			} 
		});
};

export const fetchWeatherNew = city => async dispatch => {
	return await openWeather
		.get(`?q=${city.cityRef}`)
		.catch(error => { 
			return {
				city: city, 
				message: `${city.cityRef} doesn't exist` 
			} 
		});
};

export const fetchWeathers = async selectedCities => {
	const promises = await selectedCities.map(async selectedCity => {
		const res = await fetchWeather(selectedCity);
		return res;
	});
};

export const setWeathers = weathers => {
	return {
		type: 'FETCH_WEATHERS',
		payload: weathers
	};
};