import { of as rxjsOf } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap, delay, map, switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ASYNC as AsyncTypes } from '../../../constants/index'
import { BACKEND_API } from '../../../config/api'
import { madeRequestFail, madeRequestSuccess } from '../../../actions/global'
import {
    fullFilledAllWorkFlow,
    fullFilledDeleteWorkFlow,
    fullFilledNewWorkFlow,
    fullFilledNewWorkFlowItem,
    fullFilledNewWorkFlowLink
} from '../../../actions/project'
import { getToken } from '../../../common/localStorage'

export const fetchWorkFlows = action$ =>
    action$.pipe(
        ofType(AsyncTypes.LOAD_MORE.ALL_WORKFLOW),
        mergeMap(action => {
            const fullyUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.WORKFLOW_CHART).concat("/"+action.payload)
            const requestSettings = {
                url: fullyUrl,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
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
                return fullFilledAllWorkFlow(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    )

export const updateWorkFlows = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.UPDATE_WORKFLOW_LOC),
        mergeMap(action => {
            const fullyUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.WORKFLOW_CHART)
            const requestSettings = {
                url: fullyUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    id: action.payload.id,
                    name: action.payload.name,
                    nodeDataArray: action.payload.nodeDataArray,
                    linkDataArray: action.payload.linkDataArray
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
                return madeRequestSuccess(ajax.response.message)
            }
            else
                return madeRequestFail(ajax.response.message)
        })
    )

export const createWorkFlow = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.CREATE_WORKFLOW),
        mergeMap(action => {
            const fullyUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.CREATE_WORKFLOW)
            const requestSettings = {
                url: fullyUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
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
                return fullFilledNewWorkFlow(ajax.response.data)
            }
            else {
                alert(ajax.response.message)
                return madeRequestFail(ajax.response.message)
            }
        })
    )

export const addWorkFlowItem = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.ADD_WORKFLOW_ITEM),
        mergeMap(action => {
            const fullyUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.ADD_WORKFLOW_ITEM)
            const requestSettings = {
                url: fullyUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    id: action.payload.workFlowId,
                    itemName: action.payload.name,
                    isStart: action.payload.isStart,
                    isEnd: action.payload.isEnd,
                    projectId: action.payload.projectId
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
                return fullFilledNewWorkFlowItem(ajax.response.data)
            }
            else {
                alert(ajax.response.message)
                return madeRequestFail(ajax.response.message)
            }
        })
    )

export const addWorkFlowLink = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.ADD_WORKFLOW_LINK),
        mergeMap(action => {
            const fullyUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.ADD_WORKFLOW_LINK)
            const requestSettings = {
                url: fullyUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    fromItemId: action.payload.from,
                    toItemId: action.payload.to,
                    projectId: action.payload.projectId
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
                return fullFilledNewWorkFlowLink(ajax.response.data)
            }
            else {
                return madeRequestFail(ajax.response.message)
            }
        })
    )

export const deleteWorkFlow = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.DELETE_WORKFLOW),
        mergeMap(action => {
            const fullyUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.DELETE_WORKFLOW)
            const requestSettings = {
                url: fullyUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    id: action.payload
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
                return fullFilledDeleteWorkFlow(ajax.response.data)
            }
            else {
                return madeRequestFail(ajax.response.message)
            }
        })
    )