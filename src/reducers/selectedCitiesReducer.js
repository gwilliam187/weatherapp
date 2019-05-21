export default (state = [], action) => {
	switch(action.type) {
		case 'SELECT_CITY':
			if(state.length < 2) {
				return [...state, action.payload];
			} else {
				return [state[1], action.payload];
			}
		case 'UNSELECT_CITY':
			return state.filter(el => el !== action.payload);
		case 'UNSELECT_USER':
			return [];
		default:
			return state;
	}
};