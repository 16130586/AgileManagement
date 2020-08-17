import { of as rxjsOf, forkJoin } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { mergeMap, delay, map, switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ASYNC as AsyncTypes } from '../../constants/index'
import { BACKEND_API } from '../../config/api'
import { madeRequestFail } from '../../actions/global'
import { getToken } from '../../common/localStorage'
import {
    fullFilledBoardPage,
    fullFilledRequestDADIssue,
    fullFilledRequestBoardFilterIssue,
} from '../../actions/project'

export const fetchBoardPage = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.BOARD_PAGE),
        mergeMap(action => {
            const projectId = action.payload

            const getProjectUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.PROJECT_GET_ONE)

            const getProjectSettings = {
                url: getProjectUrl.replace("{projectId}", projectId),
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

            const devTeamUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.DEV_TEAM)

            const devTeamUrlSettings = {
                url: devTeamUrl.replace('{projectId}', projectId),
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            const currentSprintUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.CURRENT_SPRINT)

            const currentSprintUrlSettings = {
                url: currentSprintUrl.replace("{projectId}", projectId),
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            return forkJoin({
                project: ajax(getProjectSettings),
                issueTypes: ajax(getIssueTypesSettings),
                workflow: ajax(getWorkflowSettings),
                devTeam: ajax(devTeamUrlSettings),
                sprint: ajax(currentSprintUrlSettings)
            })
                .pipe(
                    mergeMap(ajaxResponse =>
                        rxjsOf({
                            status: 200,
                            response: {
                                status: 200,
                                data: {
                                    project: ajaxResponse.project.response.data,
                                    issueTypes: ajaxResponse.issueTypes.response.data,
                                    workflow: ajaxResponse.workflow.response.data,
                                    devTeam: ajaxResponse.devTeam.response.data,
                                    sprint: ajaxResponse.sprint.response.data,
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
                return fullFilledBoardPage(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    );

export const DADIssue = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.DADIssue),
        mergeMap(action => {
            const dadIssueUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.DAD_ISSUE)

            const dadIssueSettings = {
                url: dadIssueUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    id: action.payload.id,
                    fromAssignee: action.payload.fromAssignee,
                    toAssignee: action.payload.toAssignee,
                    fromStatusId: action.payload.fromStatusId,
                    toStatusId: action.payload.toStatusId,
                }
            }
            return ajax(dadIssueSettings)
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
                return fullFilledRequestDADIssue(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    );


export const seachIssues = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.BOARD_FILTER_ISSUE),
        mergeMap(action => {
            const searchIssuesUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.FILTER_ISSUE_IN_SPRINT)

            const searchIssuesSettings = {
                url: searchIssuesUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    sprintId: action.payload.sprintId,
                    name : action.payload.name,
                    issueTypeId: action.payload.issueTypeId,
                }
            }
            return ajax(searchIssuesSettings)
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
                return fullFilledRequestBoardFilterIssue(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    );
