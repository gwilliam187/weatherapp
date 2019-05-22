export default (state=null, action)=>{
	switch(action.type){
		case 'INITIALISE_RXDB': return action.payload;
		default: return state;
	}
}