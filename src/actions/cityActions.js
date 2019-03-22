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