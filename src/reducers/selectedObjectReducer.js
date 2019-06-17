import { SELECT_OBJECT } from '../actions/actionTypes';

export default (state = null, action) => {
	switch(action.type) {
		case SELECT_OBJECT:
			return action.payload;
		default:
			return state;
	}
}