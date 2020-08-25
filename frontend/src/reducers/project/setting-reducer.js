import {ASYNC as AsynTypes} from '../../constants/index'
import {Project } from '../init/index'

const projectSettingReducer = (state = Project, action) => {
    let nextState = state
    switch(action.type){
        case AsynTypes.FULL_FILLED.PROJECT_DETAIL:
            nextState = {
                project : action.payload.project,
                workFlows : action.payload.workFlows}
            console.log(action.payload)
            break;
        case AsynTypes.FULL_FILLED.UPDATE_PROJECT:
            nextState = {...nextState, project: action.payload}
            break;
        default:
            break;
    }
    return nextState;
}

export default projectSettingReducer;