import { SELECT_REGION, UNSELECT_REGION } from '../actions/actionTypes';

export default (state = null, action) => {
	switch(action.type) {
		case SELECT_REGION:
			return action.payload;
		case UNSELECT_REGION:
			return null;
		default:
			return state;
	}
};