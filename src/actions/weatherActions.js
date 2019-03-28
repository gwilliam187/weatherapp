import _ from 'lodash';

import openWeather from '../apis/openWeatherAPI';
import { unselectCity } from './selectedCityActions';
import { updateCitiesErrorMessage } from './citiesErrorMessageActions';

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

export const setWeathers = weathers => {
	return {
		type: 'FETCH_WEATHERS',
		payload: weathers
	};
};

export const fetchWeathersForSelectedCities = () => async (dispatch, getState) => {
	const selectedCities = getState().selectedCities;
	const promises = await selectedCities.map( selectedCity => {
		const res = dispatch(fetchWeather(selectedCity));
		return res;
	});

	Promise.all(promises)
		.then(res => {
			let error = {};
			const weathers = res
				.map(currRes => {
					console.log(currRes);
					if('status' in currRes) {
						return currRes.data
					} else {
						console.log(currRes);
						dispatch(unselectCity(currRes.city));
						error.city = currRes.city;
						return undefined;
					}
				})
				.filter(weather => {
					return weather !== undefined;
				});

			dispatch(setWeathers(weathers));

			if(!_.isEmpty(error)) {
				dispatch(updateCitiesErrorMessage(error.city, 'CITY_NOT_FOUND'));
			}
		})
		.catch(err => { 
			console.log(err); 
		});
};