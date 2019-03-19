export default (state = [], action) => {
	switch(action.type) {
		case 'FETCH_WEATHERS': 
			return action.payload;
		default:
			return state;
	}
};