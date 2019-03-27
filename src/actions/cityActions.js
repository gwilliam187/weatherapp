import { ADD_CITY, REMOVE_CITY, SELECT_CITY, UNSELECT_CITY } from './actionTypes';

export const addCity = (city) => {
	return {
		type: ADD_CITY,
		payload: city
	};
};

export const removeCity = (city) => {
	return {
		type: REMOVE_CITY,
		payload: city
	};
};

export const selectCity = (city) => {
	return {
		type: SELECT_CITY,
		payload: city
	};
};

export const unselectCity = (city) => {
	return {
		type: UNSELECT_CITY,
		payload: city
	};
};