import { ADD_CITY, REMOVE_CITY, TOGGLE_CITY_IS_PUBLIC, INITIALISE_CITY } from '../actions/actionTypes';

const initialState = 
[
	{ cityName: 'Berlin', cityRef: 'berlin,de', isPublic: false },
	{ cityName: 'Potsdam', cityRef: 'potsdam,de', isPublic: false },
	{ cityName: 'Soest', cityRef: 'soest,de', isPublic: false },
	{ cityName: 'Jakarta', cityRef: 'jakarta,id', isPublic: false },
	{ cityName: 'Bangkok', cityRef: 'bangkok,th', isPublic: false },
	{ cityName: 'Moscow', cityRef: 'moscow,ru', isPublic: false },
];

export default (state = [], action) => {
	switch(action.type) {
		case INITIALISE_CITY:
			return action.payload;
		case ADD_CITY:
			return [...state, action.payload];
		case REMOVE_CITY:
			return state.filter(el => el !== action.payload);
		case TOGGLE_CITY_IS_PUBLIC:
			return state.map(curr => {
				return curr === action.payload ? {...curr, isPublic: !curr.isPublic } : curr
			});
		default: 
			return state;
	}
};