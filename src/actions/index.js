import {createDB, citiesCollection, login, loadCities, loadTrees, addUser, toggleCityIsPublic } from './rxdbActions' ;

import { fetchWeather, setWeathers } from './weatherActions';
import { updateCitiesErrorMessage } from './citiesErrorMessageActions';
import { selectUser } from './userActions';
import { addCity, removeCity, initialiseCity } from './cityActions';
import { initialiseTree } from "./treeAction";

// RxDB Actions
export {createDB, citiesCollection, loadCities, login, loadTrees, addUser, toggleCityIsPublic };

// Select User Actions
export {selectUser};

// Selected City Actions
export { addCity, removeCity, initialiseCity };

// Weather Actions
export { fetchWeather, setWeathers };

// Cities Error Message Actions
export { updateCitiesErrorMessage };

// Trees
export { initialiseTree }