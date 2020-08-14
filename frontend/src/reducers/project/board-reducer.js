import { ASYNC as AsyncEventTypes } from '../../constants/index'
const init = {
    project: null,
    isLoadBoardPage: false,
    issueTypes: [],
    workflow: null,
    devTeam: [],
    sprint: null,
}
const Board = (state = init, action) => {
    let nextState = state
    switch (action.type) {
        case AsyncEventTypes.FULL_FILLED.BOARD_PAGE:
            (function () {
                nextState = {
                    isLoadBoardPage: true,
                    project: action.payload.project,
                    issueTypes: action.payload.issueTypes,
                    workflow: action.payload.workflow,
                    devTeam: action.payload.devTeam,
                    sprint: action.payload.sprint,
                }
            })()
            break;
        case AsyncEventTypes.FULL_FILLED.DADIssue:
            (function () {
                let issue = action.payload.data
                let sprint = nextState.sprint
                let ido = sprint.issues.findIndex(iss => iss.id == issue.id)
                let newIssues = [
                    ...sprint.issues.slice(0 , ido),
                    issue,
                    ...sprint.issues.slice(ido+1)
                ]
                let newSprint = {
                    ...sprint,
                    issues : newIssues
                }
                nextState = {
                    ...nextState,
                    sprint : newSprint
                }
            })()
            break;
        default:
            break;
    }
    return nextState
}
export default Board