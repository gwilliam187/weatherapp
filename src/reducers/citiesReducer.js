export default (state = [], action) => {
	switch(action.type) {
		case 'ADD_CITY':
			return [...state, action.payload];
		case 'REMOVE_CITY':
			return state.filter(el => el !== action.payload);
		default: 
			return [
				{ cityName: 'Berlin', cityRef: 'berlin,de' },
				{ cityName: 'Potsdam', cityRef: 'potsdam,de' },
				{ cityName: 'Soest', cityRef: 'soest,de' },
				{ cityName: 'Jakarta', cityRef: 'jakarta,id' },
				{ cityName: 'Bangkok', cityRef: 'bangkok,th' },
				{ cityName: 'Moscow', cityRef: 'moscow,ru' },
			];
	}
};