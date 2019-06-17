import { SELECT_OBJECT } from './actionTypes';

export const selectObject = object => {
	return {
		type: SELECT_OBJECT,
		payload: object,
	};
};
