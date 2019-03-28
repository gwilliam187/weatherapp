import _ from 'lodash';
import {createDB, userCollection, loadUsers, loadCityForSelectedUser, updateCityToUser} from './rxdbActions' ;

import { selectCity, unselectCity } from './selectedCityActions';
import { fetchWeather, setWeathers } from './weatherActions';
import { updateCitiesErrorMessage } from './citiesErrorMessageActions';
import { selectUser } from './userActions';

// RxDB Actions
export {createDB, userCollection, loadUsers, loadCityForSelectedUser, updateCityToUser}

// Select User Actions
export {selectUser};

// Selected City Actions
// export { selectCity, unselectCity };

// Weather Actions
export { fetchWeather, setWeathers };

// Cities Error Message Actions
export { updateCitiesErrorMessage };
