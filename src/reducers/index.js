import { combineReducers } from 'redux';

import citiesReducer from './citiesReducer';
import selectedCitiesReducer from './selectedCitiesReducer';
import weathersReducer from './weathersReducer';
import citiesErrorMessageReducer from './citiesErrorMessageReducer';
import userListReducer from './userListReducer';
import selectedUserReducer from './selectedUserReducer';
import loginReducer from './loginReducer';

export default combineReducers({
	users: userListReducer,
	selectedUser: selectedUserReducer,
	cities: citiesReducer,
	loginState: loginReducer,
	selectedCities: selectedCitiesReducer,
	weathers: weathersReducer,
	citiesErrorMessage: citiesErrorMessageReducer
});