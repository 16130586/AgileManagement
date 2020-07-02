import {ASYNC as AsynTypes} from '../../../constants/index'
import {All_Group_Init } from '../../init/index'
const groupReducer = (state = All_Group_Init, action) => {
    let nextState = state
    switch(action.type){
        case AsynTypes.FULL_FILLED.ALL_GROUP:
            nextState = {...state , data : action.payload.data}
            console.log("called reducer")
            break;
        default:
            break;
    }
    return nextState;
}

export default groupReducer;