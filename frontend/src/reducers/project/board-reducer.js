import { ASYNC as AsyncEventTypes } from '../../constants/index'
const init = {
    project: null,
    isLoadBoardPage: false,
    issueTypes: [],
    workflow: null,
    devTeam: [],
    sprint: null,
    onFilter: false,
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
                    ...sprint.issues.slice(0, ido),
                    issue,
                    ...sprint.issues.slice(ido + 1)
                ]
                let newSprint = {
                    ...sprint,
                    issues: newIssues
                }
                nextState = {
                    ...nextState,
                    sprint: newSprint
                }
            })()
            break;
        case AsyncEventTypes.FULL_FILLED.START_SPRINT:
            (function () {
                if(!nextState.isLoadBoardPage) return
                nextState = { ...nextState, sprint: action.payload }
            })()
            break;
        case AsyncEventTypes.FULL_FILLED.COMPLETE_SPRINT:
            (function () {
                if(!nextState.isLoadBoardPage || nextState.sprint == null) return;
                nextState = { ...nextState, sprint: null }
            })()
            break;
        case AsyncEventTypes.FULL_FILLED.CREATE_NEW_ISSUE:
            (function () {
                if(!nextState.isLoadBoardPage || nextState.sprint == null) return;
                let newIssues = [...nextState.sprint.issues, action.payload]
                let newSprint = { ...nextState.sprint }
                newSprint.issues = newIssues
                nextState = { ...nextState, sprint: newSprint }
            })()
            break;
        case AsyncEventTypes.FULL_FILLED.DELETE_ISSUE:
            (function () {
                if(!nextState.isLoadBoardPage || nextState.sprint == null) return;
                let ido = nextState.sprint.issues.findIndex(iss => iss.id == action.payload.id)
                let newIssues = [...nextState.sprint.issues.slice(0, ido), ...nextState.sprint.issues.slice(ido + 1)]
                let newSprint = { ...nextState.sprint }
                newSprint.issues = newIssues
                nextState = { ...nextState, sprint: newSprint }
            })()
            break;
        case AsyncEventTypes.FULL_FILLED.ISSUE_UPDATE_DETAIL:
            (function () {
                if(!nextState.isLoadBoardPage || nextState.sprint == null) return;
                let ido = nextState.sprint.issues.findIndex(iss => iss.id == action.payload.id)
                let newIssues = [...nextState.sprint.issues.slice(0, ido),
                action.payload,
                ...nextState.sprint.issues.slice(ido + 1)]
                let newSprint = { ...nextState.sprint }
                newSprint.issues = newIssues
                nextState = { ...nextState, sprint: newSprint }
            })()
            break;
        case AsyncEventTypes.FULL_FILLED.BOARD_FILTER_ISSUE:
            (function () {
                let newIssues = action.payload
                let newSprint = { ...nextState.sprint, issues: newIssues }
                nextState = {
                    ...nextState,
                    sprint: newSprint,
                    onFilter: true,
                }
            })()
            break;
        default:
            break;
    }
    return nextState
}
export default Board