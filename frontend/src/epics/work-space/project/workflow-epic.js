import { of as rxjsOf } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap, delay, map, switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ASYNC as AsyncTypes } from '../../../constants/index'
import { BACKEND_API } from '../../../config/api'
import { madeRequestFail, madeRequestSuccess } from '../../../actions/global'
import {
    fullFilledAllWorkFlow
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
            console.log("update workflow epiccccccccccccccccc------------------")
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
                alert(ajax.response.message)
                return madeRequestSuccess(ajax.response.message)
            }
            else
                return madeRequestFail(ajax.response.message)
        })
    )