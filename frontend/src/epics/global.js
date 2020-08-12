import { of as rxjsOf } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap, delay, map, switchMap, catchError, mapTo } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import {ASYNC as AsyncTypes, Auth as AuthEventTypes} from '../constants/index'
import { BACKEND_API } from '../config/api'
import {
    tokenValid, tokenInValid, madeRequestFail,
    loginSuccess, loginFailed, signUpSuccess, signUpFailed, fullFilledAboutMe
} from '../actions/global'
import {getToken} from "../common/localStorage";
import {fullFilledAllGroup} from "../actions/work-space";
import {dispatch} from "rxjs/internal/observable/pairs";

export const validateToken = action$ =>
  action$.pipe(
    ofType(AuthEventTypes.VALIDATE_TOKEN),
    mergeMap(action => {
      const fullyUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.VALIDATE_TOKEN)
      const requestSettings = {
        url: fullyUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          token: action.payload
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
        return tokenValid(ajax.response.data)
      }
      else
        return tokenInValid()
    })
  );


export const login = action$ =>
  action$.pipe(
    ofType(AuthEventTypes.LOGIN),
    mergeMap(action => {
      const fullyUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.LOGIN)
      const requestSettings = {
        url: fullyUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          userName: action.payload.userName,
          password: action.payload.password
        }
      }
      return ajax(requestSettings)
        .pipe(
          mergeMap(ajaxResponse => rxjsOf({ status: ajaxResponse.status, response: ajaxResponse.response })),
          catchError(ajaxOnError => rxjsOf({ status: ajaxOnError.status, response: ajaxOnError.message })))
    }),
    map(ajax => {
      // xhr failed on cros, 404 , 500 - xhr not by our server
      if (ajax.status == 0)
        return madeRequestFail(ajax.response)
      // xhr request was success but server didn't return anything
      if (ajax.response == null)
        return madeRequestFail('No response from server!')
      // xhr request was sucess and 
      else if (ajax.status > 0 && ajax.response.status < 400) {
          return loginSuccess(ajax.response.data)
      }
      else
        return loginFailed()
    })
  )


  
export const signUp = action$ =>
action$.pipe(
  ofType(AuthEventTypes.SIGN_UP),
  mergeMap(action => {
    if(action.payload.password !== action.payload.confirmPassword)
      return rxjsOf({ status: 200, response: {status : 400 , data : 'Your password and confirm password is in-correct!'} })
    const fullyUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.SIGN_UP)
    const requestSettings = {
      url: fullyUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        userName: action.payload.userName,
        email : action.payload.userName,
        password: action.payload.password
      }
    }
    return ajax(requestSettings)
      .pipe(
        mergeMap(ajaxResponse => rxjsOf({ status: ajaxResponse.status, response: ajaxResponse.response })),
        catchError(ajaxOnError => rxjsOf({ status: ajaxOnError.status, response: ajaxOnError.message })))
  }),
  map(ajax => {
    // xhr failed on cros, 404 , 500 - xhr not by our server
    if (ajax.status == 0)
      return madeRequestFail(ajax.response)
    // xhr request was success but server didn't return anything
    if (ajax.response == null)
      return madeRequestFail('No response from server!')
    // xhr request was sucess and 
    else if (ajax.status > 0 && ajax.response.status < 400) {
      return signUpSuccess()
    }
    else
      return signUpFailed(ajax.response.data)
  })
)

export const fetchAboutMe = action$ =>
    action$.pipe(
        ofType(AsyncTypes.REQUEST.ABOUT_ME),
        mergeMap(action => {
            const fullyUrl = BACKEND_API.BASE_URL.concat(BACKEND_API.ACTIONS.ABOUT_ME)
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
                return fullFilledAboutMe(ajax.response.data)
            }
            else {
                return madeRequestFail(ajax.response.message)
            }
        })
    )