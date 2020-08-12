import {of as rxjsOf , from } from 'rxjs';
import {mergeMap, delay, map, catchError} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ASYNC as AsyncTypes } from '../../../../constants/index'
import {
    fullFilledAddMemberToGroup,
    fullFilledAllGroup, fullFilledCreateGroup, fullFilledDeleteGroup,
    fullFilledRemoveMemberFromGroup
} from '../../../../actions/work-space/index'
import {BACKEND_API} from "../../../../config/api";
import {getToken} from "../../../../common/localStorage";
import {ajax} from "rxjs/ajax";
import {madeRequestFail} from "../../../../actions/global";

export const fetchGroup = action$ =>
    action$.pipe(
        ofType(AsyncTypes.LOAD_MORE.ALL_GROUP),
        mergeMap(action => {
            const fullyUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.MY_GROUP)
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
                return fullFilledAllGroup(ajax.response.data)
            }
            else {
                return madeRequestFail(ajax.response.message)
            }
        })
    )

export const addMemberToGroup = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.GROUP_ADD_MEMBER),
        mergeMap(action => {
            const fullyUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.GROUP_ADD_MEMBER)
            const requestSettings = {
                url: fullyUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    groupId: action.payload.groupId,
                    dataUser: action.payload.dataUser
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
                return fullFilledAddMemberToGroup(ajax.response.data)
            }
            else {
                alert(ajax.response.message)
                return madeRequestFail(ajax.response.message)
            }
        })
    )

export const removeMemberToGroup = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.GROUP_REMOVE_MEMBER),
        mergeMap(action => {
            const fullyUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.GROUP_REMOVE_MEMBER)
            const requestSettings = {
                url: fullyUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    groupId: action.payload.groupId,
                    removeId: action.payload.userId
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
                return fullFilledRemoveMemberFromGroup(ajax.response.data)
            }
            else {
                return madeRequestFail(ajax.response.message)
            }
        })
    )

export const createGroup = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.CREATE_GROUP),
        mergeMap(action => {
            const fullyUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.CREATE_GROUP)
            const requestSettings = {
                url: fullyUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    name: action.payload.groupName
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
                return fullFilledCreateGroup(ajax.response.data)
            }
            else {
                return madeRequestFail(ajax.response.message)
            }
        })
    )

export const deleteGroup = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.DELETE_GROUP),
        mergeMap(action => {
            const fullyUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.DELETE_GROUP)
            const requestSettings = {
                url: fullyUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: {
                    groupId: action.payload,
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
                return fullFilledDeleteGroup(ajax.response.data)
            }
            else {
                return madeRequestFail(ajax.response.message)
            }
        })
    )

