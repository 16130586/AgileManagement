import { ASYNC as AsyncEventTypes } from '../../constants/index'
const Project = (state = { isLoadGrid: false, gridData: [] }, action) => {
    let nextState = state
    switch (action.type) {
        case AsyncEventTypes.FULL_FILLED.PROJECT_GRID:
            nextState = { isLoadGrid: true, gridData: action.payload }
            break;
        case AsyncEventTypes.FULL_FILLED.DELETE_PROJECT:
            nextState = {
                isLoadGrid: state.isLoadGrid,
                gridData: state.gridData.filter(s => s.id !== action.payload)
            }
            break;
        default:
            break;
    }
    return nextState
}
export default Project