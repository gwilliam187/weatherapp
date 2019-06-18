import { combineReducers } from 'redux';

import regionsReducer from './regionsReducer';
import selectedRegionsReducer from './selectedRegionReducer';
import citiesReducer from './citiesReducer';
import selectedCitiesReducer from './selectedCitiesReducer';
import weathersReducer from './weathersReducer';
import citiesErrorMessageReducer from './citiesErrorMessageReducer';
import userListReducer from './userListReducer';
import selectedUserReducer from './selectedUserReducer';
import loginReducer from './loginReducer';
import treeReducer from './treeReducer';
import rxdb from './rxdbReducer';
import selectedObjectReducer from './selectedObjectReducer';
import citiesFetcherReducer from './citiesFetcherReducer';
import citiesSyncReducer from './citiesSyncReducer';

export default combineReducers({
	regions: regionsReducer,
	selectedRegion: selectedRegionsReducer,
	users: userListReducer,
	selectedUser: selectedUserReducer,
	cities: citiesReducer,
	loginState: loginReducer,
	selectedCities: selectedCitiesReducer,
	weathers: weathersReducer,
	citiesErrorMessage: citiesErrorMessageReducer,
	trees: treeReducer,
	rxdb: rxdb,
	selectedObject: selectedObjectReducer,
	citiesFetcher: citiesFetcherReducer,
	citiesSync: citiesSyncReducer,
});