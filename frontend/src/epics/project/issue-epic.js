import {forkJoin, of as rxjsOf} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap, delay, map, switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ASYNC as AsyncTypes } from '../../constants/index'
import { BACKEND_API } from '../../config/api'
import {madeRequestFail, madeRequestSuccess} from '../../actions/global'
import { getToken } from '../../common/localStorage'
import {
    fullFilledCreateSubtask,
    fullFilledFetchIssue,
    fullFilledNewWorkFlow, fullFilledRequestUpdateDetailIssue,
    fullFilledUpdateIssueDescription
} from "../../actions/project";

export const fetchIssue = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.FETCH_ISSUE),
        mergeMap(action => {
            const fullyUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.FETCH_ISSUE)
            const getIssueSetting = {
                url: fullyUrl.replace("{issueId}", action.payload.issueId),
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            const devTeamUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.DEV_TEAM)
            const devTeamUrlSettings = {
                url: devTeamUrl.replace('{projectId}', action.payload.projectId),
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            const priorityUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.FETCH_PRIORITY)
            const prioritySetting = {
                url: priorityUrl,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            const getProjectUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.PROJECT_GET_ONE)
            const getProjectSettings = {
                url: getProjectUrl.replace("{projectId}", action.payload.projectId),
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            const getWorkflowUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.GET_WORKFLOW)
            const getWorkflowSettings = {
                url: getWorkflowUrl.replace("{projectId}", action.payload.projectId),
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            const getSubTaskUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.FETCH_SUBTASK)
            const getSubTaskSettings = {
                url: getSubTaskUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    issueId: action.payload.issueId
                }
            }

            return forkJoin({
                issue: ajax(getIssueSetting),
                devTeam: ajax(devTeamUrlSettings),
                priority: ajax(prioritySetting),
                project: ajax(getProjectSettings),
                workFlow: ajax(getWorkflowSettings),
                subTasks: ajax(getSubTaskSettings)
            }).pipe(
                mergeMap(ajaxResponse =>
                    rxjsOf({
                        status: 200,
                        response: {
                            status: 200,
                            data: {
                                issue: ajaxResponse.issue.response.data,
                                devTeam : ajaxResponse.devTeam.response.data,
                                priority: ajaxResponse.priority.response.data,
                                project: ajaxResponse.project.response.data,
                                workFlow: ajaxResponse.workFlow.response.data,
                                subTasks: ajaxResponse.subTasks.response.data
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
                return fullFilledFetchIssue(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    )

export const createSubTask = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.CREATE_SUBTASK),
        mergeMap(action => {
            const fullyUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.CREATE_SUBTASK)
            const requestSettings = {
                url: fullyUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    issueId: action.payload.issueId,
                    projectId: action.payload.projectId,
                    name: action.payload.name
                }
            }
            return ajax(requestSettings)
                .pipe(
                    mergeMap(ajaxResponse => rxjsOf({ status: ajaxResponse.status, response: ajaxResponse.response })),
                    catchError(ajaxOnError => rxjsOf({ status: ajaxOnError.status, response: ajaxOnError.message })))
        }),
        map(ajax => {
            if (ajax.status == 0)
                return madeRequestFail(ajax.response)
            if (ajax.response == null)
                return madeRequestFail('No response from server!')
            else if (ajax.status > 0 && ajax.response.status < 400) {
                return fullFilledCreateSubtask(ajax.response.data)
            }
            else {
                return madeRequestFail(ajax.response.message)
            }
        })
    )

export const updateDescription = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.UPDATE_ISSUE_DESCRIPTION),
        mergeMap(action => {
            const fullyUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.ISSUE_UPDATE_DETAIL)
            const requestSettings = {
                url: fullyUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    issueId: action.payload.issueId,
                    description: action.payload.description
                }
            }
            return ajax(requestSettings)
                .pipe(
                    mergeMap(ajaxResponse => rxjsOf({ status: ajaxResponse.status, response: ajaxResponse.response })),
                    catchError(ajaxOnError => rxjsOf({ status: ajaxOnError.status, response: ajaxOnError.message })))
        }),
        map(ajax => {
            if (ajax.status == 0)
                return madeRequestFail(ajax.response)
            if (ajax.response == null)
                return madeRequestFail('No response from server!')
            else if (ajax.status > 0 && ajax.response.status < 400) {
                return fullFilledUpdateIssueDescription(ajax.response.data)
            }
            else {
                return madeRequestFail(ajax.response.message)
            }
        })
    )

export const updateIssue = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.UPDATE_ISSUE_DETAILS),
        mergeMap(action => {
            const updateDetailIssueUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.ISSUE_UPDATE_DETAIL)

            const updateDetailIssueSettings = {
                url: updateDetailIssueUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    issueId: action.payload.issueId,
                    description: action.payload.description,
                    issueTypeId: action.payload.issueType,
                    storyPoint: action.payload.storyPoint,
                    assigneeEmail: action.payload.assignmentEmail,
                    workflowStatus: action.payload.workflowStatus,
                    priority: action.payload.priority
                }
            }

            return ajax(updateDetailIssueSettings)
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
                alert(ajax.response.message)
                return madeRequestSuccess(ajax.response.message)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    );
