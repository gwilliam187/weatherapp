import _ from 'lodash';
import {createDB, userCollection, loadUsers, loadWeatherForSelectedUser, updateCityToUser} from './rxdbActions' ;

import { selectCity, unselectCity } from './selectedCityActions';
import { fetchWeather, setWeathers } from './weatherActions';

// RxDB Actions
export {createDB, userCollection, loadUsers, loadWeatherForSelectedUser, updateCityToUser}

// Selected City Actions
export { selectCity, unselectCity };

// Weather Actions
export { fetchWeather, setWeathers };


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

export const updateCitiesErrorMessage = (city, status) => {
	if(status === 'CITY_NOT_FOUND') {
		return {
			type: 'CITY_NOT_FOUND'
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