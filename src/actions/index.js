import {createDB, userCollection, loadUsers, loadWeatherForSelectedUser, updateCityToUser} from './rxdbActions' ;

import { selectCity, unselectCity } from './selectedCityActions';
import { fetchWeather, setWeathers } from './weatherActions';
import { updateCitiesErrorMessage } from './citiesErrorMessageActions';

// RxDB Actions
export {createDB, userCollection, loadUsers, loadWeatherForSelectedUser, updateCityToUser}

// Selected City Actions
// export { selectCity, unselectCity };

// Weather Actions
export { fetchWeather, setWeathers };

// Cities Error Message Actions
export { updateCitiesErrorMessage };