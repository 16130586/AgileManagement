import { ASYNC as AsyncEventTypes } from '../../constants/index'
const init = { isLoadBacklogPage: false, backlogItems: [], workingSprints: [] }
const Backlog = (state = init, action) => {
    let nextState = state
    let sprintId = -1
    let issueId = -1
    let nextSprints = []
    let idoSprint = -1
    switch (action.type) {
        case AsyncEventTypes.FULL_FILLED.BACKLOG_PAGE:
            nextState = {
                isLoadBacklogPage: true,
                backlogItems: action.payload.backlogItems,
                workingSprints: action.payload.workingSprints
            }
            break;
        case AsyncEventTypes.FULL_FILLED.CREATE_SPRINT:
            nextSprints = [...nextState.workingSprints, action.payload]
            nextState = {
                ...nextState,
                workingSprints: nextSprints
            }
            break;
        case AsyncEventTypes.FULL_FILLED.EDIT_SPRINT:
        case AsyncEventTypes.FULL_FILLED.START_SPRINT:
            idoSprint = nextState.workingSprints.findIndex(sprint => sprint.id == action.payload.id)
            nextSprints =[...nextState.workingSprints.slice(0, idoSprint),
                action.payload 
                ,...nextState.workingSprints.slice(idoSprint + 1)]
            nextState = {
                ...nextState,
                workingSprints: nextSprints
            }
            break;
        case AsyncEventTypes.FULL_FILLED.DELETE_SPRINT:
            sprintId = action.payload.id
            idoSprint = nextState.workingSprints.findIndex(sprint => sprint.id == sprintId)
            nextSprints = [...nextState.workingSprints.slice(0, idoSprint), ...nextState.workingSprints.slice(idoSprint + 1)]
            nextState = {
                ...nextState,
                workingSprints: nextSprints
            }
            break;
        case AsyncEventTypes.FULL_FILLED.TOP_OF_BACKLOG:
            nextState = {
                ...nextState,
                backlogItems: action.payload
            }
            break;
        case AsyncEventTypes.FULL_FILLED.BOTTOM_OF_BACKLOG:
            nextState = {
                ...nextState,
                backlogItems: action.payload
            }
            break;
        case AsyncEventTypes.FULL_FILLED.MOVE_UP_SPRINT:
        case AsyncEventTypes.FULL_FILLED.MOVE_DOWN_SPRINT:
            nextState = {
                ...nextState,
                workingSprints: action.payload
            }
            break;
        default:
            break;
    }
    return nextState
}
export default Backlog