import { SELECT_CITY, UNSELECT_CITY } from './actionTypes';

export const selectCity = (city) => {
	return {
		type: SELECT_CITY,
		payload: {
			_id: city._id,
			cityName: city.cityName
		}
	};
};

export const unselectCity = (city) => {
	return {
		type: UNSELECT_CITY,
		payload: city
	};
};