import {createDB, citiesCollection, login, loadCities, addUser, toggleCityIsPublic, toggleCityName} from './rxdbActions' ;

import { fetchWeather, setWeathers } from './weatherActions';
import { updateCitiesErrorMessage } from './citiesErrorMessageActions';
import { selectUser } from './userActions';
import { addCity, removeCity, initialiseCity } from './cityActions';

// RxDB Actions
export {createDB, citiesCollection, loadCities, login, addUser, toggleCityIsPublic, toggleCityName};

// Select User Actions
export {selectUser};

// Selected City Actions
export { addCity, removeCity, initialiseCity };

// Weather Actions
export { fetchWeather, setWeathers };

// Cities Error Message Actions
export { updateCitiesErrorMessage };
