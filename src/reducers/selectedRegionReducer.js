import { SELECT_REGION } from '../actions/actionTypes';

export default (state = null, action) => {
	switch(action.type) {
		case SELECT_REGION:
			return action.payload;
		default:
			return state;
	}
};