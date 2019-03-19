import { combineReducers } from 'redux';

import citiesReducer from './citiesReducer';
import selectedCitiesReducer from './selectedCitiesReducer';
import weathersReducer from './weathersReducer';
import citiesErrorMessageReducer from './citiesErrorMessageReducer';

export default combineReducers({
	cities: citiesReducer,
	selectedCities: selectedCitiesReducer,
	weathers: weathersReducer,
	citiesErrorMessage: citiesErrorMessageReducer
});