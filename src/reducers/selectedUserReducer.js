import { SELECT_USER } from '../actions/actionTypes';

export default (state = "steven_klarens", action) => {
	switch(action.type) {
		case SELECT_USER:
			return action.payload;
		default:
			return state;
	}
};