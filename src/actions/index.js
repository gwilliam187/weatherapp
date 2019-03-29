import _ from 'lodash';
import {createDB, citiesCollection, login, loadCities, addUser, updateCityToUser} from './rxdbActions' ;

import { selectCity, unselectCity } from './selectedCityActions';
import { fetchWeather, setWeathers } from './weatherActions';
import { updateCitiesErrorMessage } from './citiesErrorMessageActions';
import { selectUser } from './userActions';
import { addCity, removeCity, initialiseCity, toggleCityIsPublic } from './cityActions';

// RxDB Actions
export {createDB, citiesCollection, loadCities, login, addUser, updateCityToUser};

// Select User Actions
export {selectUser};

// Selected City Actions
export { addCity, removeCity, initialiseCity, toggleCityIsPublic };

// Weather Actions
export { fetchWeather, setWeathers };

// Cities Error Message Actions
export { updateCitiesErrorMessage };
