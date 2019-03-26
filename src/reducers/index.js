import { combineReducers } from 'redux';

import citiesReducer from './citiesReducer';
import selectedCitiesReducer from './selectedCitiesReducer';
import weathersReducer from './weathersReducer';
import citiesErrorMessageReducer from './citiesErrorMessageReducer';
import usersReducer from './usersReducer';

export default combineReducers({
	users: usersReducer,
	cities: citiesReducer,
	selectedCities: selectedCitiesReducer,
	weathers: weathersReducer,
	citiesErrorMessage: citiesErrorMessageReducer
});