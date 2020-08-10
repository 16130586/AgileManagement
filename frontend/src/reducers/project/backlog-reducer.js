import { ASYNC as AsyncEventTypes } from '../../constants/index'
const init = {
    project : null,
    isLoadBacklogPage: false,
    backlogItems: [],
    workingSprints: [],
    issueTypes: [],
    workflow: null,
    devTeam: []
}
const Backlog = (state = init, action) => {
    let nextState = state
    let sprintId = -1
    let issueId = -1
    switch (action.type) {
        case AsyncEventTypes.FULL_FILLED.BACKLOG_PAGE:
            nextState = {
                isLoadBacklogPage: true,
                project: action.payload.project,
                backlogItems: action.payload.backlogItems,
                workingSprints: action.payload.workingSprints,
                issueTypes: action.payload.issueTypes,
                workflow : action.payload.workflow,
                devTeam : action.payload.devTeam
            }
            break;
        case AsyncEventTypes.FULL_FILLED.CREATE_SPRINT:
            (function () {
                let nextSprints = [...nextState.workingSprints, action.payload]
                nextState = {
                    ...nextState,
                    workingSprints: nextSprints
                }
            })()
            break;
        case AsyncEventTypes.FULL_FILLED.EDIT_SPRINT:
        case AsyncEventTypes.FULL_FILLED.START_SPRINT:
            (function () {
                let idoSprint = nextState.workingSprints.findIndex(sprint => sprint.id == action.payload.id)
                let nextSprints = [...nextState.workingSprints.slice(0, idoSprint),
                action.payload
                    , ...nextState.workingSprints.slice(idoSprint + 1)]
                nextState = {
                    ...nextState,
                    workingSprints: nextSprints
                }
            })()
            break;
        case AsyncEventTypes.FULL_FILLED.DELETE_SPRINT:
            (function () {
                let sprintId = action.payload.id
                let idoSprint = nextState.workingSprints.findIndex(sprint => sprint.id == sprintId)
                let nextSprints = [...nextState.workingSprints.slice(0, idoSprint), ...nextState.workingSprints.slice(idoSprint + 1)]
                nextState = {
                    ...nextState,
                    workingSprints: nextSprints
                }
            })()
            break;
        case AsyncEventTypes.FULL_FILLED.TOP_OF_BACKLOG:
            (function () {
                issueId = action.payload.issueId
                sprintId = action.payload.sprintId
                let spIdo = nextState.workingSprints.findIndex(sp => sp.id == sprintId)
                let issIdo = nextState.workingSprints[spIdo].issues.findIndex(is => is.id == issueId)
                let targetIss = nextState.workingSprints[spIdo].issues[issIdo]
                targetIss.sprint = null
                let newIssues = [...nextState.workingSprints[spIdo].issues.slice(0, issIdo),
                ...nextState.workingSprints[spIdo].issues.slice(issIdo + 1)]
                nextState.workingSprints[spIdo].issues = newIssues

                nextState.backlogItems.unshift(targetIss)
                nextState = {
                    ...nextState,
                    workingSprints: [...nextState.workingSprints],
                    backlogItems: [...nextState.backlogItems]
                }
            })()
            break;
        case AsyncEventTypes.FULL_FILLED.BOTTOM_OF_BACKLOG:
            (function () {
                issueId = action.payload.issueId
                sprintId = action.payload.sprintId
                let spIdo = nextState.workingSprints.findIndex(sp => sp.id == sprintId)
                let issIdo = nextState.workingSprints[spIdo].issues.findIndex(is => is.id == issueId)
                let targetIss = nextState.workingSprints[spIdo].issues[issIdo]
                targetIss.sprint = null
                let newIssues = [...nextState.workingSprints[spIdo].issues.slice(0, issIdo),
                ...nextState.workingSprints[spIdo].issues.slice(issIdo + 1)]
                nextState.workingSprints[spIdo].issues = newIssues

                nextState.backlogItems.push(targetIss)
                nextState = {
                    ...nextState,
                    workingSprints: [...nextState.workingSprints],
                    backlogItems: [...nextState.backlogItems]
                }
            })()
            break;
        case AsyncEventTypes.FULL_FILLED.MOVE_UP_SPRINT:
        case AsyncEventTypes.FULL_FILLED.MOVE_DOWN_SPRINT:
            nextState = {
                ...nextState,
                workingSprints: action.payload
            }
            break;
        case AsyncEventTypes.FULL_FILLED.DELETE_ISSUE:
            (function () {
                const issueId = action.payload.id
                let isInWorkingSprints = false
                let isInBacklog = false

                let idoInWorkingSprints = -1
                let idoIssue = -1

                let idoInBacklog = -1
                nextState.workingSprints.forEach((sprint, index) => {
                    sprint.issues.forEach((issue, issIndex) => {
                        if (issue.id == issueId) {
                            isInWorkingSprints = true
                            idoInWorkingSprints = index
                            idoIssue = issIndex
                        }
                    })
                })

                nextState.backlogItems.forEach((iss, index) => {
                    if (iss.id == issueId) {
                        isInBacklog = true
                        idoIssue = index
                    }
                })

                if (isInWorkingSprints) {

                    let newWorkingSprints = []

                    nextState.workingSprints.forEach((sprint, index) => {
                        let newIssues = []
                        sprint.issues.forEach((iss, issIndex) => {
                            if (!(index == idoInWorkingSprints && issIndex == idoIssue)) {
                                newIssues.push(iss)
                            }

                        })
                        newWorkingSprints.push({ ...sprint, issues: newIssues })
                    })
                    nextState = {
                        ...nextState,
                        workingSprints: newWorkingSprints
                    }
                }
                if (isInBacklog) {
                    nextState = {
                        ...nextState,
                        backlogItems: [
                            ...nextState.backlogItems.slice(0, idoIssue),
                            ...nextState.backlogItems.slice(idoIssue + 1)
                        ]
                    }
                }
            })()
            break;

        case AsyncEventTypes.FULL_FILLED.MOVE_ISSUE:
            (function () {
                let fromSprintId = action.payload.fromSprintId
                let toSprintId = action.payload.toSprintId
                issueId = action.payload.issueId

                let newWorkingSprints = []
                let targetIssue = null

                nextState.workingSprints.forEach((sprint, sIndex) => {
                    let newIss = []
                    sprint.issues.forEach((issue, issIndex) => {
                        newIss.push({ ...issue })
                    })
                    if (sprint.id == fromSprintId) {
                        let ido = newIss.findIndex(iss => iss.id == issueId)
                        targetIssue = newIss[ido]
                        newIss = [...newIss.slice(0, ido), ...newIss.slice(ido + 1)]

                    }
                    newWorkingSprints.push({ ...sprint, issues: newIss })
                })

                let idoOfToSprint = newWorkingSprints.findIndex(sp => sp.id == toSprintId)
                //sprint a to sprint b
                if (fromSprintId > 0 && targetIssue != null) {
                    newWorkingSprints[idoOfToSprint].issues.push(targetIssue)
                    nextState = {
                        ...nextState,
                        workingSprints: newWorkingSprints
                    }
                }
                // backlog to sprint
                if (fromSprintId == -1 && targetIssue == null) {
                    let ido = nextState.backlogItems.findIndex(iss => iss.id == issueId)
                    targetIssue = { ...nextState.backlogItems[ido] }
                    newWorkingSprints[idoOfToSprint].issues.push(targetIssue)
                    let newBacklogItems = [...nextState.backlogItems.slice(0, ido),
                    ...nextState.backlogItems.slice(ido + 1)]
                    nextState = {
                        ...nextState,
                        workingSprints: newWorkingSprints,
                        backlogItems: newBacklogItems
                    }
                }
            })()
            break;
        case AsyncEventTypes.FULL_FILLED.CREATE_NEW_ISSUE:
            (function () {
                if (action.payload.sprint != null) {
                    sprintId = action.payload.sprint.id
                }
                // create issue inside a sprint
                if (sprintId > 0) {
                    let idoSprint = nextState.workingSprints.findIndex(sp => sp.id == sprintId)
                    let newIssues = [...nextState.workingSprints[idoSprint].issues, action.payload]
                    nextState.workingSprints[idoSprint].issues = newIssues
                    nextState = {
                        ...nextState,
                        workingSprints: [...nextState.workingSprints]
                    }
                }
                //create issue in backlog
                else {
                    let newBacklogItems = [...nextState.backlogItems, action.payload]
                    nextState = {
                        ...nextState,
                        backlogItems: newBacklogItems
                    }
                }
            })()
            break;

        case AsyncEventTypes.FULL_FILLED.COMPLETE_SPRINT:
            (function () {
                let sprintId = action.payload.id
                let idoSprint = nextState.workingSprints.findIndex(sp => sp.id == sprintId)
                let newWorkingSprints = [
                    ...nextState.workingSprints.slice(0, idoSprint),
                    ...nextState.workingSprints.slice(idoSprint + 1)
                ]
                let newBacklogItems = [
                    ...nextState.backlogItems
                ]
                action.payload.issues.forEach(iss => {
                    if (iss.status.start == true) {
                        newBacklogItems.unshift(iss)
                    }
                })
                nextState = {
                    ...nextState,
                    workingSprints: newWorkingSprints,
                    backlogItems: newBacklogItems
                }
            })()
            break;
            case AsyncEventTypes.FULL_FILLED.ISSUE_UPDATE_DETAIL:
                console.log(action.payload)
                break;
        default:
            break;
    }
    return nextState
}
export default Backlog