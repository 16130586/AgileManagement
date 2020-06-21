import { Auth as AuthEventTypes, Router as RouterTypes } from '../constants/index'
const initState = { isAppLoad: false, user: null, forceRedirectTo: null }
const Common = (state = initState, action) => {
    let nextState = state
    switch (action.type) {
        case AuthEventTypes.TOKEN_VALID:
            nextState = {...state , user : action.payload}
            break;
        case AuthEventTypes.TOKEN_IN_VALID:
            nextState = { ...state , forceRedirectTo : '/login' , isAppLoad : true }
            break;
        case RouterTypes.Redirect:
            nextState = { ...state , forceRedirectTo: action.payload }
            break;
        case RouterTypes.ClearRedirectUrl:
            nextState = { ...state , forceRedirectTo: null }
            break;
    }
    return nextState
}
export default Common