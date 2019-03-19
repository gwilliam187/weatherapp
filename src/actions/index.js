import _ from 'lodash';

import openWeather from '../apis/openWeatherAPI';

export const selectCity = (city) => {
	return {
		type: 'SELECT_CITY',
		payload: city
	};
};

export const removeCity = (city) => {
	return {
		type: 'REMOVE_CITY',
		payload: city
	};
};

export const fetchWeather = (city) => async (dispatch, getState) => {
	const res = await openWeather
		.get(`?q=${city.cityName},${city.countryCode}`)
		.catch(error => {
			console.log(error);
			// dispatch({
			// 	type: 'REMOVE_CITY',
			// 	payload: city
			// });
		});

	if(!res) {
		return {
			type: 'REMOVE_CITY',
			payload: city
		};
	}

	return {
		type: 'FETCH_WEATHER',
		payload: res.data
	};
};


export const fetchWeathersForSelectedCities = () => async (dispatch, getState) => {
	const selectedCities = getState().selectedCities;
	const promises = await selectedCities.map(selectedCity => {
		const res = dispatch(fetchWeather(selectedCity));
		return res;
	});

	Promise.all(promises).then(function(res) {
		let error = {};
		const weathers = res
			.map(currRes => {
				if(currRes.type === 'FETCH_WEATHER') {
					return currRes.payload;
				} else if(currRes.type === 'REMOVE_CITY') {
					error.message = currRes.payload;
					dispatch(currRes);
				}
			})
			.filter(weather => {
				return weather !== undefined;
			});
		
		dispatch({
			type: 'FETCH_WEATHERS',
			payload: weathers
		});

		if(!_.isEmpty(error)) {
			dispatch(updateCitiesErrorMessage(error.message, 'CITY_NOT_FOUND'));
		}
	})
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