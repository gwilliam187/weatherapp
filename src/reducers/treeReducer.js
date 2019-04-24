import { INITIALISE_TREE } from "../actions/actionTypes";

export default (state=[], action)=>{
	switch (action.type){
		case INITIALISE_TREE: return action.payload;
		default: return state;
	}
}