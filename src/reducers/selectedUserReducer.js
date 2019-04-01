import { SELECT_USER, UNSELECT_USER } from '../actions/actionTypes';

export default (state=null, action) => {
	switch(action.type) {
		case SELECT_USER:
			return action.payload;
		case UNSELECT_USER:
			return null;
		default:
			return state;
	}
};