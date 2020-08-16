import { of as rxjsOf } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap, delay, map, switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ASYNC as AsyncTypes } from '../../constants/index'
import { BACKEND_API } from '../../config/api'
import { madeRequestFail } from '../../actions/global'
import {
    fullFilledRequestProjectDetail,
} from '../../actions/project'
import { getToken } from '../../common/localStorage'

export const getProject = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.PROJECT_DETAIL),
        mergeMap(action => {
            const url = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.PROJECT_GET_ONE);
            const requestSettings = {
                url: url.replace("{projectId}", action.payload),
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
                return fullFilledRequestProjectDetail(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    )

export const updateProject = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.PROJECT_UPDATE),
        mergeMap(action => {
            console.log('handle update', action.payload)
            const url = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.PROJECT_UPDATE);
            const requestSettings = {
                url: url,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    id: action.payload.id,
                    name: action.payload.name,
                    key: action.payload.key,
                    description: action.payload.description,
                    leader: action.payload.leader
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
                console.log(ajax.response);
                ajax.response.data.save = "save successful"
                return fullFilledRequestProjectDetail(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    )

export const addMember = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.PROJECT_ADD_MEMBER),
        mergeMap(action => {
            console.log('handle add member', action.payload)
            const url = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.PROJECT_ADD_MEMBER_USERNAME);
            const requestSettings = {
                url: url,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    userName: action.payload.userName,
                    projectID: action.payload.projectID,

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
                console.log(ajax.response);
                ajax.response.data.save = "add member successful"
                return fullFilledRequestProjectDetail(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })

)

export const removeMember = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.PROJECT_REMOVE_MEMBER),
        mergeMap(action => {
            console.log('handle add member', action.payload)
            const url = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.PROJECT_REMOVE_MEMBER);
            const requestSettings = {
                url: url,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    userID: action.payload.userID,
                    projectID: action.payload.projectID,
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
                console.log(ajax.response);
                ajax.response.data.save = "remove member successful"
                return fullFilledRequestProjectDetail(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })

)
