import { SELECT_REGION } from './actionTypes';

export const selectRegion = region => {
	return {
		type: SELECT_REGION,
		payload: region,
	};
};