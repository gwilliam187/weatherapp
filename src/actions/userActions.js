import { SELECT_USER } from './actionTypes';

export const selectUser = (user) =>{
    console.log("called with "+user)
    return {
        type: SELECT_USER,
        payload: user
    }
}