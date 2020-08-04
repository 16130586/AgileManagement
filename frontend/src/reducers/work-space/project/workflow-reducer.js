import {ASYNC as AsynTypes} from '../../../constants/index'
import {All_WorkFlow } from '../../init/index'
const workFlowReducer = (state = All_WorkFlow, action) => {
    let nextState = state
    switch(action.type){
        case AsynTypes.FULL_FILLED.ALL_WORKFLOW:
            nextState = action.payload;
            break;
        case AsynTypes.FULL_FILLED.UPDATE_WORKFLOW_LOC:
            if (action.payload.data != null)
                nextState.forEach(function (item, i) {
                    if(item.id == action.payload.workFlowId) {
                        item.nodeDataArray.forEach(function (node, j) {
                            if (node.key == action.payload.data.key) {
                                nextState[i].nodeDataArray[j] = action.payload.data
                            }
                        })
                    }
                })
            console.log(nextState)
            break;
        default:
            break;
    }
    return nextState;
}

export default workFlowReducer;