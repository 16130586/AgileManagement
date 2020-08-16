import { of as rxjsOf, forkJoin } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { mergeMap, delay, map, switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ASYNC as AsyncTypes } from '../../constants/index'
import { BACKEND_API } from '../../config/api'
import { madeRequestFail } from '../../actions/global'
import { getToken } from '../../common/localStorage'
import {
    fullFilledFetchProject, fullFilledFetchVelocityChart
} from '../../actions/project'


export const fetchSingleProject = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.FETCH_PROJECT),
        mergeMap(action => {
            const projectId = action.payload
            const singleProjectUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.PROJECT_GET_ONE)

            const singleProjecSettings = {
                url: singleProjectUrl.replace("{projectId}", projectId),
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            return ajax(singleProjecSettings)
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
                return fullFilledFetchProject(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    );

export const fetchVelocityDataFeedChart = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.FETCH_VELOCITY_CHART),
        mergeMap(action => {
            const projectId = action.payload
            const fetchVelocityDataFeedUrl = BACKEND_API.BASE_URL
                .concat(BACKEND_API.ACTIONS.VELOCITY_DATA_FEED)

            const fetchVelocityDataFeedSettings = {
                url: fetchVelocityDataFeedUrl.replace("{projectId}", projectId),
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }

            return ajax(fetchVelocityDataFeedSettings)
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
                return fullFilledFetchVelocityChart(ajax.response.data)
            }
            else
                return madeRequestFail(ajax.response.data)
        })
    );