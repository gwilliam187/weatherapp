import { SELECT_REGION, UNSELECT_REGION } from './actionTypes';

export const selectRegion = region => {
	return {
		type: SELECT_REGION,
		payload: region,
	};
};

export const unselectRegion = ()=>{
	return {
		type: UNSELECT_REGION,
		payload: null
	}
}