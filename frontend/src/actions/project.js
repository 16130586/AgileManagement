import { ASYNC as AsyncEventTypes } from '../constants/index'
export const deleteProject = (id) => ({ type: AsyncEventTypes.REQUEST.DELETE_PROJECT, payload: id })
export const createProject = (payload) => ({ type: AsyncEventTypes.REQUEST.CREATE_PROJECT, payload })
export const createProjectSuccess = (projectCreated) => ({ type: AsyncEventTypes.REQUEST.CREATE_PROJECT_SUCCESS, payload: projectCreated })
export const createProjectFailed = (msg) => ({ type: AsyncEventTypes.REQUEST.CREATE_PROJECT_FAILED, payload: msg })
export const fetchProjectGrid = () => ({ type: AsyncEventTypes.LOAD_MORE.PROJECT_GRID })
export const fullFilledProjectGrid = (data) => ({ type: AsyncEventTypes.FULL_FILLED.PROJECT_GRID, payload: data })
export const fullFilledDeleteProject = (id) => ({ type: AsyncEventTypes.FULL_FILLED.DELETE_PROJECT, payload: id })

export const fetchAllWorkFlow = (projectId) => ({ type: AsyncEventTypes.LOAD_MORE.ALL_WORKFLOW, payload: projectId })
export const fullFilledAllWorkFlow = (data) => ({ type: AsyncEventTypes.FULL_FILLED.ALL_WORKFLOW, payload: data })

export const updateWorkFlowItem = (data) => ({ type: AsyncEventTypes.REQUEST.UPDATE_WORKFLOW_LOC, payload: data })
export const fullFilledUpdateWorkFlowItem = (data) => ({ type: AsyncEventTypes.FULL_FILLED.UPDATE_WORKFLOW_LOC, payload: data })

export const createWorkFlow = (data) => ({ type: AsyncEventTypes.REQUEST.CREATE_WORKFLOW, payload: data })
export const fullFilledNewWorkFlow = (data) => ({ type: AsyncEventTypes.FULL_FILLED.NEW_WORKFLOW, payload: data })

export const addWorkFlowItem = (data) => ({ type: AsyncEventTypes.REQUEST.ADD_WORKFLOW_ITEM, payload: data })
export const fullFilledNewWorkFlowItem = (data) => ({ type: AsyncEventTypes.FULL_FILLED.NEW_WORKFLOW_ITEM, payload: data })

export const addWorkFlowLink = (data) => ({ type: AsyncEventTypes.REQUEST.ADD_WORKFLOW_LINK, payload: data })
export const fullFilledNewWorkFlowLink = (data) => ({ type: AsyncEventTypes.FULL_FILLED.NEW_WORKFLOW_LINK, payload: data })
export const fullFilledRemovedWorkFlowItem = (workFlowId, data) => ({ type: AsyncEventTypes.FULL_FILLED.REMOVE_WORKFLOW_ITEM, payload: { workFlowId: workFlowId, data: data } })
export const fullFilledRemovedWorkFlowLink = (workFlowId, data) => ({ type: AsyncEventTypes.FULL_FILLED.REMOVE_WORKFLOW_LINK, payload: { workFlowId: workFlowId, data: data } })

export const fetchBacklogPage = (projectId) => ({ type: AsyncEventTypes.LOAD_MORE.BACKLOG_PAGE, payload: projectId })
export const fullFilledBacklogPage = (data) => ({ type: AsyncEventTypes.FULL_FILLED.BACKLOG_PAGE, payload: data })

export const requestDeleteSprint = (sprintId) => ({ type: AsyncEventTypes.REQUEST.DELETE_SPRINT, payload: sprintId })
export const fullFilledRequestDeleteSprint = (sprintId) => ({ type: AsyncEventTypes.FULL_FILLED.DELETE_SPRINT, payload: sprintId })

export const requestTopOfBacklog = (issueId, sprintId) => ({ type: AsyncEventTypes.REQUEST.TOP_OF_BACKLOG, payload: { issueId, sprintId } })
export const fullFilledRequestTopOfBacklog = (data) => ({ type: AsyncEventTypes.FULL_FILLED.TOP_OF_BACKLOG, payload: data })

export const requestBottomOfBacklog = (issueId, sprintId) => ({ type: AsyncEventTypes.REQUEST.BOTTOM_OF_BACKLOG, payload: { issueId, sprintId } })
export const fullFilledRequestBottomOfBacklog = (data) => ({ type: AsyncEventTypes.FULL_FILLED.BOTTOM_OF_BACKLOG, payload: data })


export const requestMoveUpSprint = (sprintId) => ({ type: AsyncEventTypes.REQUEST.MOVE_UP_SPRINT, payload: sprintId })
export const fullFilledRequestMoveUpSprint = (workingSprints) => ({ type: AsyncEventTypes.FULL_FILLED.MOVE_UP_SPRINT, payload: workingSprints })


export const requestMoveDownSprint = (sprintId) => ({ type: AsyncEventTypes.REQUEST.MOVE_DOWN_SPRINT, payload: sprintId })
export const fullFilledRequestMoveDownSprint = (workingSprints) => ({ type: AsyncEventTypes.FULL_FILLED.MOVE_DOWN_SPRINT, payload: workingSprints })


export const requestCreateSprint = (projectId) => ({ type: AsyncEventTypes.REQUEST.CREATE_SPRINT, payload: projectId })
export const fullFilledRequestCreateSprint = (sprint) => ({ type: AsyncEventTypes.FULL_FILLED.CREATE_SPRINT, payload: sprint })

export const requestEditSprint = (data) => ({ type: AsyncEventTypes.REQUEST.EDIT_SPRINT, payload: data })
export const fullFilledRequestEditSprint = (sprint) => ({ type: AsyncEventTypes.FULL_FILLED.EDIT_SPRINT, payload: sprint })

export const requestStartSprint = (data) => ({ type: AsyncEventTypes.REQUEST.START_SPRINT, payload: data })
export const fullFilledRequestStartSprint = (sprint) => ({ type: AsyncEventTypes.FULL_FILLED.START_SPRINT, payload: sprint })

export const requestDeleteIssue = (issueId, projectId) => ({ type: AsyncEventTypes.REQUEST.DELETE_ISSUE, payload: {issueId, projectId} })
export const fullFilledRequestDeleteIssue = (issue) => ({ type: AsyncEventTypes.FULL_FILLED.DELETE_ISSUE, payload: issue })

export const searchProject = (data) => ({type: AsyncEventTypes.REQUEST.SEARCH_PROJECT, payload: data})
export const fullFilledSearchProject = (data) => ({type: AsyncEventTypes.FULL_FILLED.SEARCH_PROJECT, payload: data});


export const requestMoveIssueToSprint = (fromSprintId, toSprintId, issueId) => ({ type: AsyncEventTypes.REQUEST.MOVE_ISSUE, payload: {fromSprintId, toSprintId , issueId} })
export const fullFilledRequestMoveIssueToSprint = (data) => ({ type: AsyncEventTypes.FULL_FILLED.MOVE_ISSUE, payload: data })

export const requestCreateNewIssue = (data) => ({ type: AsyncEventTypes.REQUEST.CREATE_NEW_ISSUE, payload: data })
export const fullFilledRequestCreateNewIssue = (data) => ({ type: AsyncEventTypes.FULL_FILLED.CREATE_NEW_ISSUE, payload: data })


export const requestCompleteSprint = (sprintId) => ({ type: AsyncEventTypes.REQUEST.COMPLETE_SPRINT, payload: sprintId })
export const fullFilledRequestCompleteSprint = (sprint) => ({ type: AsyncEventTypes.FULL_FILLED.COMPLETE_SPRINT, payload: sprint })

export const requestUpdateDetailIssue = (data) => ({ type: AsyncEventTypes.REQUEST.ISSUE_UPDATE_DETAIL, payload: data })
export const fullFilledRequestUpdateDetailIssue = (issue) => ({ type: AsyncEventTypes.FULL_FILLED.ISSUE_UPDATE_DETAIL, payload: issue })

export const deleteWorkFlow = (workFlowId) => ({type: AsyncEventTypes.REQUEST.DELETE_WORKFLOW, payload: workFlowId})
export const fullFilledDeleteWorkFlow = (workFlowId) => ({type: AsyncEventTypes.FULL_FILLED.DELETE_WORKFLOW, payload: workFlowId})


export const fetchBoardPage = (projectId) => ({ type: AsyncEventTypes.REQUEST.BOARD_PAGE, payload: projectId })
export const fullFilledBoardPage = (data) => ({ type: AsyncEventTypes.FULL_FILLED.BOARD_PAGE, payload: data })

export const requestDADIssue = (data) => ({ type: AsyncEventTypes.REQUEST.DADIssue, payload: data })
export const fullFilledRequestDADIssue = (data) => ({ type: AsyncEventTypes.FULL_FILLED.DADIssue, payload: data })

export const fetchIssue = (projectId, issueId) => ({type: AsyncEventTypes.REQUEST.FETCH_ISSUE, payload: {issueId: issueId, projectId: projectId}})
export const fullFilledFetchIssue = (data) => ({type: AsyncEventTypes.FULL_FILLED.FETCH_ISSUE, payload: data})

export const createSubTask = (data) => ({type: AsyncEventTypes.REQUEST.CREATE_SUBTASK, payload: data})
export const fullFilledCreateSubtask = (data) => ({type: AsyncEventTypes.FULL_FILLED.CREATE_SUBTASK, payload: data})

export const updateIssueDescription = (data) => ({type: AsyncEventTypes.REQUEST.UPDATE_ISSUE_DESCRIPTION, payload: data})
export const fullFilledUpdateIssueDescription = (data) => ({type: AsyncEventTypes.FULL_FILLED.UPDATE_ISSUE_DESCRIPTION, payload: data})

export const updateIssueDetails = (data) => ({type: AsyncEventTypes.REQUEST.UPDATE_ISSUE_DETAILS, payload: data})

