export default(state = '', action) => {
	console.log('enter error with action ' + action.type);
	switch(action.type) {
		case 'ALLES_GUT':
			return '';
		case 'CITY_NOT_FOUND':
			return `${action.payload} not found`;
		case 'INVALID_INPUT':
			return 'Invalid input';
		default:
			return state;
	}
}