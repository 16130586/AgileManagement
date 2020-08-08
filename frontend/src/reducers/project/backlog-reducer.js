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
            nextSprints = [...nextState.workingSprints.slice(0, idoSprint),
            action.payload
                , ...nextState.workingSprints.slice(idoSprint + 1)]
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
                        console.log(ido + " " + JSON.stringify(targetIssue))
                        newIss = [...newIss.slice(0, ido), ...newIss.slice(ido + 1)]

                    }
                    newWorkingSprints.push({ ...sprint, issues: newIss })
                })
                
                let idoOfToSprint = newWorkingSprints.findIndex(sp => sp.id == toSprintId)
                if(targetIssue == null) console.log('null nha cu')
                newWorkingSprints[idoOfToSprint].issues.push(targetIssue)
                
                console.log(newWorkingSprints)
                nextState = {
                    ...nextState,
                    workingSprints: newWorkingSprints
                }
            })()

            break;
        default:
            break;
    }
    return nextState
}
export default Backlog