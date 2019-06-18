import { 
	GET_CITIES_REQUEST, 
	GET_CITIES_SUCCESS, 
	GET_CITIES_FAILURE 
} from '../actions/actionTypes';

export default (state = { isFetching: false }, action) => {
	switch(action.type) {
		case GET_CITIES_REQUEST:
			return { isFetching: true };
		case GET_CITIES_SUCCESS:
			return { isFetching: false };
		case GET_CITIES_FAILURE:
			return { isFetching: false };
		default:
			return state;
	}
};