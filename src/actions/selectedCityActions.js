import { SELECT_CITY, UNSELECT_CITY } from './actionTypes';

export const selectCity = (city) => {
	return {
		type: SELECT_CITY,
		payload: {
			cityName: city.cityName,
			cityRef: city.cityRef
		}
	};
};

export const unselectCity = (city) => {
	return {
		type: UNSELECT_CITY,
		payload: city
	};
};