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
    fullFilledFetchIssue, fullFilledFetchSubTaskPage, fullFilledLogWork,
    fullFilledNewWorkFlow, fullFilledRequestUpdateDetailIssue,
    fullFilledUpdateIssueDescription
} from "../../actions/project";

export const fetchSubTaskPage = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.SUBTASK_DETAILS),
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

            const getSubTaskUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.FETCH_ONE_SUBTASK)
            const getSubTaskSettings = {
                url: getSubTaskUrl.replace("{subTaskId}", action.payload.subTaskId),
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            return forkJoin({
                issue: ajax(getIssueSetting),
                devTeam: ajax(devTeamUrlSettings),
                project: ajax(getProjectSettings),
                workFlow: ajax(getWorkflowSettings),
                subTask: ajax(getSubTaskSettings)
            }).pipe(
                mergeMap(ajaxResponse =>
                    rxjsOf({
                        status: 200,
                        response: {
                            status: 200,
                            data: {
                                issue: ajaxResponse.issue.response.data,
                                devTeam : ajaxResponse.devTeam.response.data,
                                project: ajaxResponse.project.response.data,
                                workFlow: ajaxResponse.workFlow.response.data,
                                subTask: ajaxResponse.subTask.response.data
                            }
                        }
                    })
                ),
                catchError(ajaxOnError => rxjsOf({ status: ajaxOnError.status, response: ajaxOnError.message })))
        }),
        map(ajax => {
            if (ajax.status == 0) {
                return madeRequestFail(ajax.response)
            }
            if (ajax.response == null)
                return madeRequestFail('No response from server!')
            else if (ajax.status > 0 && ajax.response.status < 400) {
                return fullFilledFetchSubTaskPage(ajax.response.data)
            }
            else {
                return madeRequestFail(ajax.response.data)
            }
        })
    )

export const updateSubTask = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.UPDATE_SUBTASK),
        mergeMap(action => {
            const updateSubTaskUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.UPDATE_SUBTASK)

            const updateSubTaskSettings = {
                url: updateSubTaskUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    subtaskId: action.payload.subTaskId,
                    description: action.payload.description,
                    name: action.payload.name,
                    workflowStatus: action.payload.workflowStatus,
                    estimateTime: action.payload.estimateTime,
                    assignedId: action.payload.assignment
                }
            }

            return ajax(updateSubTaskSettings)
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
                return fullFilledLogWork(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    );

export const logWork = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.LOG_WORK),
        mergeMap(action => {
            const logWorkUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.LOG_WORK)

            const logWorkSetting = {
                url: logWorkUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    subtaskId: action.payload.subTaskId,
                    logWorkTime: action.payload.logWorkTime
                }
            }

            return ajax(logWorkSetting)
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
                return fullFilledLogWork(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    );