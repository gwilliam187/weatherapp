import openWeather from '../apis/openWeatherAPI';

export const fetchWeather = (city) => {
	return async (dispatch) => {
		const res = await openWeather
			.get(`?q=${city.cityName},${city.countryCode}`)
			.catch(error => { return {city: city, message: `${city.cityName} doesn't exist`} });
		const data = await res;

		return data;
	}
};