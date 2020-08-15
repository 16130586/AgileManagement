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
            let newLogWorkList = [...nextState.subTask.logWorkList, action.payload]
            let newSubTask = {...nextState.subTask, logWorkList:newLogWorkList}
            nextState = {...nextState, subTask: newSubTask}
            break;
        default:
            break;
    }
    console.log(nextState)
    return nextState;
}

export default SubTaskReducer