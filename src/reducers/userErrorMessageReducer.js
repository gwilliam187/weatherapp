export default (state = null, action) => {
	switch(action.type) {
        case "USER_NOT_EXIST": return true;
        case "RESET_USER_ERROR_WARNING" : return false;
		default:
			return state;
	}
};