import {
	CITIES_START_SYNC, 
	CITIES_STOP_SYNC,
} from '../actions/actionTypes';

export const citiesStartSync = () => {
	return {
		type: CITIES_START_SYNC,
	};
};

export const citiesStopSync = () => {
	return {
		type: CITIES_STOP_SYNC,
	};
};