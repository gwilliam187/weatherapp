import { SELECT_USER } from './actionTypes';

export const selectUser = (user) =>{
    return {
        type: SELECT_USER,
        payload: user
    }
}