import { SELECT_USER } from '../actions/actionTypes';

export default(state="", action) => {
	if	(action.type===SELECT_USER){
        console.log("called")
        return action.payload;
    }

	return state;
};