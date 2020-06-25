import { of as rxjsOf } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap, delay, map, switchMap, catchError , mapTo} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { Auth as AuthEventTypes } from '../constants/index'
import { BACKEND_API } from '../config/api'
import { tokenValid, tokenInValid, madeRequestFail, loginSuccess, loginFailed } from '../actions/global'

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
    }),
    map(ajax => {
      const response = ajax.response
      if (response == null)
        return madeRequestFail('No response from server!')
      if (response.status == 200) {
        return tokenValid(response.data)
      }
      if (response.status == 400) {
        return tokenInValid()
      }
    }),
    catchError(ajax => {
      if (ajax.status > 0 && ajax.status < 500) return rxjsOf(tokenInValid())
      return rxjsOf(madeRequestFail(ajax.message))
    })
  );


export const login = action$ =>
  action$.pipe(
    ofType(AuthEventTypes.LOGIN),
    mergeMap(action => {
      console.log(action)
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
    }),
    map(ajax => {
      // always ajax.status < 400
      const response = ajax.response
      if (response == null)
        return madeRequestFail('No response from server!')
      if (response.status < 400) {
        return loginSuccess(response.data)
      }
    }),
    // ajax.status >= 400
    catchError(ajax => {
      console.log(ajax)
      if (ajax.status > 0 && ajax.status < 500) return rxjsOf(loginFailed())
      return rxjsOf(madeRequestFail(ajax.message))
    })//,
  );