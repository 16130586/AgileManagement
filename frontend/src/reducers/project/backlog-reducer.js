import { ASYNC as AsyncEventTypes } from '../../constants/index'
const init = { isLoadBacklogPage: false, backlogPage: {} }
const Backlog = (state = init, action) => {
    let nextState = state
    switch (action.type) {
        case AsyncEventTypes.FULL_FILLED.BACKLOG_PAGE:
            nextState = { isLoadBacklogPage: true, backlogPage: action.payload }
            break;
        default:
            break;
    }
    return nextState
}
export default Backlog