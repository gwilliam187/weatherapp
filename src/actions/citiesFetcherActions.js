import { 
	GET_CITIES_REQUEST, 
	GET_CITIES_SUCCESS, 
	GET_CITIES_FAILURE 
} from '../actions/actionTypes';

export const getCitiesRequest = () => {
	return {
		type: GET_CITIES_REQUEST,
	};
};

export const getCitiesSuccess = () => {
	return {
		type: GET_CITIES_SUCCESS,
	};
};

export const getCitiesFailure = () => {
	return {
		type: GET_CITIES_FAILURE,
	};
};
