export default (state=0, action)=>{
    switch  (action.type){
        case "SELECT_USER" : return 1;
        case 'SELECT_REGION': return 1;
        case "UNSELECT_USER" : return 0;
        default: return state;
    }
}