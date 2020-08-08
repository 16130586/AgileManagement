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

export const updateWorkFlowLocation = (data) => ({ type: AsyncEventTypes.REQUEST.UPDATE_WORKFLOW_LOC, payload: data })
export const fullFilledUpdateWorkFlowLocation = (data) => ({ type: AsyncEventTypes.FULL_FILLED.UPDATE_WORKFLOW_LOC, payload: data })

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

export const requestTopOfBacklog = (issueId, backlogId) => ({ type: AsyncEventTypes.REQUEST.TOP_OF_BACKLOG, payload: { issueId, backlogId } })
export const fullFilledRequestTopOfBacklog = (backlogItems) => ({ type: AsyncEventTypes.FULL_FILLED.TOP_OF_BACKLOG, payload: backlogItems })

export const requestBottomOfBacklog = (issueId, backlogId) => ({ type: AsyncEventTypes.REQUEST.BOTTOM_OF_BACKLOG, payload: { issueId, backlogId } })
export const fullFilledRequestBottomOfBacklog = (backlogItems) => ({ type: AsyncEventTypes.FULL_FILLED.BOTTOM_OF_BACKLOG, payload: backlogItems })


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




export const requestMoveIssueToSprint = (fromSprintId, toSprintId, issueId) => ({ type: AsyncEventTypes.REQUEST.MOVE_ISSUE, payload: {fromSprintId, toSprintId , issueId} })
export const fullFilledRequestMoveIssueToSprint = (data) => ({ type: AsyncEventTypes.FULL_FILLED.MOVE_ISSUE, payload: data })
