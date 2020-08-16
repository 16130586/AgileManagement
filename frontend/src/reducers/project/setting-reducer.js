import {ASYNC as AsynTypes} from '../../constants/index'
import {Project } from '../init/index'

const projectSettingReducer = (state = Project, action) => {
    let nextState = state
    switch(action.type){
        case AsynTypes.FULL_FILLED.PROJECT_DETAIL:
            nextState = {project : action.payload}
            console.log("project setting reducer", nextState)
            break;
        default:
            break;
    }
    return nextState;
}

export default projectSettingReducer;