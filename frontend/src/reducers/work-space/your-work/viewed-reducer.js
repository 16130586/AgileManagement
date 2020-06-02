import {WorkSpace_YourWork_Viewed_Init} from '../../init/index'
import {ASYNC as AsynTypes} from '../../../constants/index'
const viewdReducer = (state = WorkSpace_YourWork_Viewed_Init , action) => {
    let nextState = state
    switch(action.type){
        case AsynTypes.FULL_FILLED.MORE_VIEWED: 
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
export default viewdReducer