import { SELECT_USER } from '../actions/actionTypes';

export default(state="", action) => {
	console.log('called reducer')
	switch(action.type) {
		case SELECT_USER:
			console.log('select user called');
			return action.payload;
		default:
			return state;
	}
	// if	(action.type===SELECT_USER){
 //        console.log("called")
 //        return action.payload;
 //    }

	// return state;
};