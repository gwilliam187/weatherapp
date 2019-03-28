import { SELECT_USER } from './actionTypes';

export const selectUser = (user) =>{
		console.log('selectuser action')
    return {
        type: SELECT_USER,
        payload: user
    }
}
