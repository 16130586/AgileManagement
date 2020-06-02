import {WorkSpace_YourWork_AssignToMe_Init } from '../../init/index'
import {ASYNC as AsynTypes} from '../../../constants/index'
const assignToMeReducer = (state = WorkSpace_YourWork_AssignToMe_Init , action) => {
    let nextState = state
    switch(action.type){
        case AsynTypes.FULL_FILLED.TOTAL_ASSIGN_TO_ME:
            console.log(action.payload.data)
            nextState = {...state , totalAssignToMe : action.payload.data}
            break;
        case AsynTypes.FULL_FILLED.ASSIGNED_TO_ME: 
            if(action.payload.data == null){
                nextState = {...state , isAvaiable : false}
            }
            let cD = action.payload.data
            nextState = {
                ...state,
                page : state.page + 1,
                isAvaiable : cD.length > 0 ? cD[cD.length - 1].row < cD[cD.length - 1].totalRow : false,
                data :  state.data.concat(cD)
            }
            break;
        default:
            break;
    }
    return nextState
}
export default assignToMeReducer