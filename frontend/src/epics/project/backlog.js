import { of as rxjsOf } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap, delay, map, switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ASYNC as AsyncTypes } from '../../constants/index'
import {fullFilledBacklogPage} from '../../actions/project'
import { BACKEND_API } from '../../config/api'
import { madeRequestFail } from '../../actions/global'
import { getToken } from '../../common/localStorage'

export const fetchBacklogPage = action$ =>
    action$.pipe(
        ofType(AsyncTypes.LOAD_MORE.BACKLOG_PAGE),
        mergeMap(action => {
            const fullyUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.ADD_WORKFLOW_ITEM)
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
                return fullFilledBacklogPage(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    );

