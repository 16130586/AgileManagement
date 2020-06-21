import { of as rxjsOf } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap, delay, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { Auth as AuthEventTypes } from '../constants/index'
import {BACKEND_API} from '../config/api'
import {tokenValid , tokenInValid} from '../actions/global'
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
          console.log(ajax)
          if(ajax.status < 400){
            const response = ajax.response
            if(response.status == 200){
              return tokenValid(response.data)
            }
            if(response.status == 400){
              return tokenInValid()
            }
          }
        })
    );