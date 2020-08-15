import { ASYNC as AsyncEventTypes } from '../../constants/index'
const init = {
    subTask: null,
    devTeam: [],
    workFlow: null,
    project: null,
    issue: null,
}

const SubTaskReducer = (state = init, action) => {
    let nextState = state;
    switch(action.type) {
        case AsyncEventTypes.FULL_FILLED.SUBTASK_DETAILS:
            nextState = {
                subTask: action.payload.subTask,
                devTeam: action.payload.devTeam,
                workFlow: action.payload.workFlow,
                project: action.payload.project,
                issue: action.payload.issue,
            }
            break;
        case AsyncEventTypes.FULL_FILLED.LOG_WORK:
            nextState.subTask.logWorkList = [...nextState.subTask.logWorkList, action.payload]
            break;
        default:
            break;
    }
    return nextState;
}

export default SubTaskReducer