import { of as rxjsOf, forkJoin } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { mergeMap, delay, map, switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ASYNC as AsyncTypes } from '../../constants/index'
import { BACKEND_API } from '../../config/api'
import { madeRequestFail } from '../../actions/global'
import { getToken } from '../../common/localStorage'
import {
    fullFilledBacklogPage, fullFilledRequestDeleteSprint,
    fullFilledRequestTopOfBacklog, fullFilledRequestBottomOfBacklog,
    fullFilledRequestMoveUpSprint, fullFilledRequestMoveDownSprint,
    fullFilledRequestCreateSprint, fullFilledRequestEditSprint,
    fullFilledRequestStartSprint, fullFilledRequestDeleteIssue,
    fullFilledRequestMoveIssueToSprint, fullFilledRequestCreateNewIssue,
    fullFilledRequestCompleteSprint,
} from '../../actions/project'

export const fetchBacklogPage = action$ =>
    action$.pipe(
        ofType(AsyncTypes.LOAD_MORE.BACKLOG_PAGE),
        mergeMap(action => {
            const projectId = action.payload
            const getBacklogItemsUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.PROJECT_GET_BACKLOG_ITEMS)

            const getBacklogItemsSettings = {
                url: getBacklogItemsUrl.replace("{projectId}", projectId),
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }


            const getWorkingSprintsUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.PROJECT_GET_WORKING_SPRINTS)
            const getWorkingSprintsSettings = {
                url: getWorkingSprintsUrl.replace("{projectId}", projectId),
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            const getIssueTypesUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.PROJECT_GET_ISSUE_TYPES)

            const getIssueTypesSettings = {
                url: getIssueTypesUrl.replace("{projectId}", projectId),
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            const getWorkflowUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.GET_WORKFLOW)

            const getWorkflowSettings = {
                url: getWorkflowUrl.replace("{projectId}", projectId),
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            return forkJoin({
                backlogItemsRequest: ajax(getBacklogItemsSettings),
                workingSprintsRequest: ajax(getWorkingSprintsSettings),
                issueTypes: ajax(getIssueTypesSettings),
                workflow: ajax(getWorkflowSettings),
            })
                .pipe(
                    mergeMap(ajaxResponse =>
                        rxjsOf({
                            status: 200,
                            response: {
                                status: 200,
                                data: {
                                    backlogItems: ajaxResponse.backlogItemsRequest.response.data,
                                    workingSprints: ajaxResponse.workingSprintsRequest.response.data,
                                    issueTypes: ajaxResponse.issueTypes.response.data,
                                    workflow: ajaxResponse.workflow.response.data
                                }
                            }
                        })
                    ),
                    catchError(ajaxOnError => rxjsOf({ status: ajaxOnError.status, response: ajaxOnError.message })))
        }),
        map(ajax => {
            if (ajax.status == 0)
                return madeRequestFail(ajax.response)
            if (ajax.response == null)
                return madeRequestFail('No response from server!')
            else if (ajax.status > 0 && ajax.response.status < 400) {
                return fullFilledBacklogPage(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    );

export const deleteSprint = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.DELETE_SPRINT),
        mergeMap(action => {
            const sprintId = action.payload
            const deleteSprintUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.DELETE_SPRINT)

            const deleteSrintSettings = {
                url: deleteSprintUrl.replace("{id}", sprintId),
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            return ajax(deleteSrintSettings)
                .pipe(
                    mergeMap(ajaxResponse => rxjsOf({ status: ajaxResponse.status, response: ajaxResponse.response })),
                    catchError(ajaxOnError => rxjsOf({ status: ajaxOnError.status, response: ajaxOnError.message }))
                )
        }),
        map(ajax => {
            if (ajax.status == 0)
                return madeRequestFail(ajax.response)
            if (ajax.response == null)
                return madeRequestFail('No response from server!')
            else if (ajax.status > 0 && ajax.response.status < 400) {
                return fullFilledRequestDeleteSprint(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    );

export const topOfBacklog = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.TOP_OF_BACKLOG),
        mergeMap(action => {
            const issueId = action.payload.issueId
            const topOfBacklogUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.TOP_OF_BACKLOG)
            const topOfBacklogSettings = {
                url: topOfBacklogUrl.replace("{id}", issueId),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    issueId: action.payload.issueId,
                    sprintId: action.payload.sprintId
                }
            }
            return ajax(topOfBacklogSettings)
                .pipe(
                    mergeMap(ajaxResponse => rxjsOf({ status: ajaxResponse.status, response: ajaxResponse.response })),
                    catchError(ajaxOnError => rxjsOf({ status: ajaxOnError.status, response: ajaxOnError.message }))
                )
        }),
        map(ajax => {
            if (ajax.status == 0)
                return madeRequestFail(ajax.response)
            if (ajax.response == null)
                return madeRequestFail('No response from server!')
            else if (ajax.status > 0 && ajax.response.status < 400) {
                return fullFilledRequestTopOfBacklog(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    );

export const bottomOfBacklog = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.BOTTOM_OF_BACKLOG),
        mergeMap(action => {
            const issueId = action.payload.issueId
            const bottomOfBacklogUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.BOTTOM_OF_BACKLOG)

            const bottomOfBacklogSettings = {
                url: bottomOfBacklogUrl.replace("{id}", issueId),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    issueId: action.payload.issueId,
                    sprintId: action.payload.sprintId
                }
            }

            return ajax(bottomOfBacklogSettings)
                .pipe(
                    mergeMap(ajaxResponse => rxjsOf({ status: ajaxResponse.status, response: ajaxResponse.response })),
                    catchError(ajaxOnError => rxjsOf({ status: ajaxOnError.status, response: ajaxOnError.message }))
                )
        }),
        map(ajax => {
            if (ajax.status == 0)
                return madeRequestFail(ajax.response)
            if (ajax.response == null)
                return madeRequestFail('No response from server!')
            else if (ajax.status > 0 && ajax.response.status < 400) {
                return fullFilledRequestBottomOfBacklog(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    );


export const moveUp = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.MOVE_UP_SPRINT),
        mergeMap(action => {
            const sprintId = action.payload
            const moveUpUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.MOVE_UP_SPRINT)

            const moveUpSettings = {
                url: moveUpUrl.replace("{id}", sprintId),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            return ajax(moveUpSettings)
                .pipe(
                    mergeMap(ajaxResponse => rxjsOf({ status: ajaxResponse.status, response: ajaxResponse.response })),
                    catchError(ajaxOnError => rxjsOf({ status: ajaxOnError.status, response: ajaxOnError.message }))
                )
        }),
        map(ajax => {
            if (ajax.status == 0)
                return madeRequestFail(ajax.response)
            if (ajax.response == null)
                return madeRequestFail('No response from server!')
            else if (ajax.status > 0 && ajax.response.status < 400) {
                return fullFilledRequestMoveUpSprint(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    )

export const moveDown = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.MOVE_DOWN_SPRINT),
        mergeMap(action => {
            const sprintId = action.payload
            const moveDownUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.MOVE_DOWN_SPRINT)

            const moveDownSettings = {
                url: moveDownUrl.replace("{id}", sprintId),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            return ajax(moveDownSettings)
                .pipe(
                    mergeMap(ajaxResponse => rxjsOf({ status: ajaxResponse.status, response: ajaxResponse.response })),
                    catchError(ajaxOnError => rxjsOf({ status: ajaxOnError.status, response: ajaxOnError.message }))
                )
        }),
        map(ajax => {
            if (ajax.status == 0)
                return madeRequestFail(ajax.response)
            if (ajax.response == null)
                return madeRequestFail('No response from server!')
            else if (ajax.status > 0 && ajax.response.status < 400) {
                return fullFilledRequestMoveDownSprint(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    )


export const createSprint = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.CREATE_SPRINT),
        mergeMap(action => {
            const projectId = action.payload
            const createSprintUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.CREATE_SPRINT)

            const createSprintSettings = {
                url: createSprintUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    projectId
                }
            }

            return ajax(createSprintSettings)
                .pipe(
                    mergeMap(ajaxResponse => rxjsOf({ status: ajaxResponse.status, response: ajaxResponse.response })),
                    catchError(ajaxOnError => rxjsOf({ status: ajaxOnError.status, response: ajaxOnError.message }))
                )
        }),
        map(ajax => {
            if (ajax.status == 0)
                return madeRequestFail(ajax.response)
            if (ajax.response == null)
                return madeRequestFail('No response from server!')
            else if (ajax.status > 0 && ajax.response.status < 400) {
                return fullFilledRequestCreateSprint(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    )


export const editSprint = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.EDIT_SPRINT),
        mergeMap(action => {
            const sprintId = action.payload.sprintId
            const editSprintUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.EDIT_SPRINT)

            const editSprintSettings = {
                url: editSprintUrl.replace('{id}', sprintId),
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    sprintId: action.payload.sprintId,
                    name: action.payload.name,
                    goal: action.payload.goal

                }
            }

            return ajax(editSprintSettings)
                .pipe(
                    mergeMap(ajaxResponse => rxjsOf({ status: ajaxResponse.status, response: ajaxResponse.response })),
                    catchError(ajaxOnError => rxjsOf({ status: ajaxOnError.status, response: ajaxOnError.message }))
                )
        }),
        map(ajax => {
            if (ajax.status == 0)
                return madeRequestFail(ajax.response)
            if (ajax.response == null)
                return madeRequestFail('No response from server!')
            else if (ajax.status > 0 && ajax.response.status < 400) {
                return fullFilledRequestEditSprint(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    )


export const startSprint = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.START_SPRINT),
        mergeMap(action => {
            const sprintId = action.payload.sprintId
            const startSprintUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.START_SPRINT)

            const startSprintSettings = {
                url: startSprintUrl.replace('{id}', sprintId),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    sprintId: action.payload.sprintId,
                    name: action.payload.name,
                    goal: action.payload.goal,
                    startDate: action.payload.startDate,
                    endDate: action.payload.endDate
                }
            }

            return ajax(startSprintSettings)
                .pipe(
                    mergeMap(ajaxResponse => rxjsOf({ status: ajaxResponse.status, response: ajaxResponse.response })),
                    catchError(ajaxOnError => rxjsOf({ status: ajaxOnError.status, response: ajaxOnError.message }))
                )
        }),
        map(ajax => {
            if (ajax.status == 0)
                return madeRequestFail(ajax.response)
            if (ajax.response == null)
                return madeRequestFail('No response from server!')
            else if (ajax.status > 0 && ajax.response.status < 400) {
                return fullFilledRequestStartSprint(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    )



export const deleteIssue = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.DELETE_ISSUE),
        mergeMap(action => {
            const deleteIssueUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.DELETE_ISSUE)

            const deleteIssueSettings = {
                url: deleteIssueUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    id: action.payload.issueId,
                    projectId: parseInt(action.payload.projectId)
                }
            }

            return ajax(deleteIssueSettings)
                .pipe(
                    mergeMap(ajaxResponse => rxjsOf({ status: ajaxResponse.status, response: ajaxResponse.response })),
                    catchError(ajaxOnError => rxjsOf({ status: ajaxOnError.status, response: ajaxOnError.message }))
                )
        }),
        map(ajax => {
            if (ajax.status == 0)
                return madeRequestFail(ajax.response)
            if (ajax.response == null)
                return madeRequestFail('No response from server!')
            else if (ajax.status > 0 && ajax.response.status < 400) {
                return fullFilledRequestDeleteIssue(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    )


export const moveIssueToSprint = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.MOVE_ISSUE),
        mergeMap(action => {
            const moveIssueUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.MOVE_ISSUE)

            const moveIssueUrlSettings = {
                url: moveIssueUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    issueId: action.payload.issueId,
                    fromSprintId: action.payload.fromSprintId,
                    toSprintId: action.payload.toSprintId,

                }
            }

            return ajax(moveIssueUrlSettings)
                .pipe(
                    mergeMap(ajaxResponse => rxjsOf({ status: ajaxResponse.status, response: ajaxResponse.response })),
                    catchError(ajaxOnError => rxjsOf({ status: ajaxOnError.status, response: ajaxOnError.message }))
                )
        }),
        map(ajax => {
            if (ajax.status == 0)
                return madeRequestFail(ajax.response)
            if (ajax.response == null)
                return madeRequestFail('No response from server!')
            else if (ajax.status > 0 && ajax.response.status < 400) {
                return fullFilledRequestMoveIssueToSprint(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    )


export const createNewIssue = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.CREATE_NEW_ISSUE),
        mergeMap(action => {
            const createNewIssueURl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.CREATE_NEW_ISSUE)

            const createNewIssueSettings = {
                url: createNewIssueURl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    sprintId: action.payload.sprintId,
                    projectId: parseInt(action.payload.projectId),
                    issueTypeId: action.payload.issueTypeId,
                    description: action.payload.issueDescription,
                }
            }

            return ajax(createNewIssueSettings)
                .pipe(
                    mergeMap(ajaxResponse => rxjsOf({ status: ajaxResponse.status, response: ajaxResponse.response })),
                    catchError(ajaxOnError => rxjsOf({ status: ajaxOnError.status, response: ajaxOnError.message }))
                )
        }),
        map(ajax => {
            if (ajax.status == 0)
                return madeRequestFail(ajax.response)
            if (ajax.response == null)
                return madeRequestFail('No response from server!')
            else if (ajax.status > 0 && ajax.response.status < 400) {
                return fullFilledRequestCreateNewIssue(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    );

export const completeSprint = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.COMPLETE_SPRINT),
        mergeMap(action => {
            const sprintId = action.payload
            const completeSprintUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.COMPLETE_SPRINT)

            const completeSprintSettings = {
                url: completeSprintUrl.replace('{id}', sprintId),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            return ajax(completeSprintSettings)
                .pipe(
                    mergeMap(ajaxResponse => rxjsOf({ status: ajaxResponse.status, response: ajaxResponse.response })),
                    catchError(ajaxOnError => rxjsOf({ status: ajaxOnError.status, response: ajaxOnError.message }))
                )
        }),
        map(ajax => {
            if (ajax.status == 0)
                return madeRequestFail(ajax.response)
            if (ajax.response == null)
                return madeRequestFail('No response from server!')
            else if (ajax.status > 0 && ajax.response.status < 400) {
                return fullFilledRequestCompleteSprint(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    );
