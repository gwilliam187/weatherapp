import {INITIALISE_TREE} from "./actionTypes";

export const initialiseTree = (trees) =>{
	return{
		type: INITIALISE_TREE,
		payload: trees
	}
}