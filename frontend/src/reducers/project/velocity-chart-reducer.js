import { ASYNC as AsyncEventTypes } from '../../constants/index'
const init = {
    isLoadPage: false,
    project: null,
    feedData: [],
}

const VelocityReducer = function (state = init, action) {
    let nextState = state

    switch (action.type) {
        case AsyncEventTypes.REQUEST.COMPLETE_SPRINT:
            if(!nextState.isLoadPage) break;
            nextState = init
            break;
        case AsyncEventTypes.FULL_FILLED.FETCH_PROJECT:
            nextState = {
                ...nextState,
                project: action.payload,
                isLoadPage: true
            }
            break;
        case AsyncEventTypes.FULL_FILLED.FETCH_VELOCITY_CHART:
            nextState = {
                ...nextState,
                feedData : action.payload,
                isLoadPage: true
            }
            break;
        default:
            break;
    }
    return nextState
}

export default VelocityReducer