import { ADD_CITY, REMOVE_CITY, TOGGLE_CITY_IS_PUBLIC, INITIALISE_CITY } from './actionTypes';
import { toast } from 'react-toastify';

export const initialiseCity = (cities) =>{
	return {
		type: INITIALISE_CITY,
		payload: cities
	}
}

export const addCity = (city) => {
	return {
		type: ADD_CITY,
		payload: city
	};
};

export const removeCity = (city) => {
	toast(`Removed city "${city.cityName}"`);
	return {
		type: REMOVE_CITY,
		payload: city
	};
};

export const toggleCityIsPublic = (city) => async(dispatch, getState) => {
	let cities = getState().cities;
	// cities = cities.map(currentCity=>{
	// 	if	(city===currentCity){
	// 		currentCity.isPublic = !currentCity.isPublic;
	// 		return cities;
	// 	}
	// })
	console.log(cities);
	cities = cities.map(curr => {
		curr.isPublic = curr === city ? {...curr, isPublic: !curr.isPublic } : curr
	});
	
	dispatch( {
		type: TOGGLE_CITY_IS_PUBLIC,
		payload: cities
	});
};