import {
	CITIES_START_SYNC, 
	CITIES_STOP_SYNC,
} from '../actions/actionTypes';

export default (state = { isSyncing: false }, action) => {
	switch(action.type) {
		case CITIES_START_SYNC:
			return { isSyncing: true };
		case CITIES_STOP_SYNC:
			return { isSyncing: false };
		default:
			return state;
	}
};