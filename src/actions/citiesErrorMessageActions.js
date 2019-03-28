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