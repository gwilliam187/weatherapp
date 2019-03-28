import { SELECT_USER } from '../actions/actionTypes';

export default (state = null, action) => {
	switch(action.type) {
		case SELECT_USER:
			return action.payload;
		default:
			return state;
	}
};