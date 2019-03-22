import _ from 'lodash';

import openWeather from '../apis/openWeatherAPI';
import { selectCity, removeCity } from './cityActions';
import { fetchWeather } from './weatherActions';

// City Actions
export { selectCity };
export { removeCity };

// Weather Actions
export { fetchWeather };


export const fetchWeathersForSelectedCities = () => async (dispatch, getState) => {
	const selectedCities = getState().selectedCities;
	const promises = await selectedCities.map(async selectedCity => {
		const res = await dispatch(fetchWeather(selectedCity));
		return res;
	});

	Promise.all(promises)
		.then(res => {
			let error = {};
			const weathers = res
				.map(currRes => {
					if('status' in currRes) {
						return currRes.data
					} else {
						dispatch(removeCity(currRes.city));
						error.city = currRes.city;
						return undefined;
					}
				})
				.filter(weather => {
					return weather !== undefined;
				});

			dispatch({
				type: 'FETCH_WEATHERS',
				payload: weathers
			});
			//setWeathers(weathers)(dispatch, getState);

			if(!_.isEmpty(error)) {
				dispatch(updateCitiesErrorMessage(error.city, 'CITY_NOT_FOUND'));
			}
		})
		.catch(err => { 
			console.log(err); 
		});
};

export const updateCitiesErrorMessage = (city, status) => {
	if(status === 'CITY_NOT_FOUND') {
		console.log('returning not found');
		return {
			type: 'CITY_NOT_FOUND',
			payload: city.cityName
		};
	} else if(status === 'INVALID_INPUT') {
		return {
			type: 'INVALID_INPUT'
		};
	}

	return {
		type: 'ALLES_GUT'
	};
};