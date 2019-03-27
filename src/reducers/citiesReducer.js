export default (state = [], action) => {
	switch(action.type) {
		case 'ADD_CITY':
			return [...state, action.payload];
		case 'REMOVE_CITY':
			return state.filter(el => el !== action.payload);
		default: 
			return [
				{ cityName: 'Berlin', countryCode: 'de' },
				{ cityName: 'Potsdam', countryCode: 'de' },
				{ cityName: 'Soest', countryCode: 'de' },
				{ cityName: 'Jakarta', countryCode: 'id' },
				{ cityName: 'Bangkok', countryCode: 'th' },
				{ cityName: 'Moscow', countryCode: 'ru' },
			];
	}
};