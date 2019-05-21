import { SELECT_USER, UNSELECT_USER } from './actionTypes';

export const selectUser = user => {
  return {
    type: SELECT_USER,
    payload: user
  };
}

export const unselectUser = () => {
	return {
		type: UNSELECT_USER
	};
}