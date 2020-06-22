import { Auth as AuthEventTypes, Router as RouterTypes } from '../constants/index'
import { saveToken, getToken } from '../common/localStorage'
const initState = {
    isAppLoad: false,
    user: null,
    forceRedirectTo: null,
    token :  getToken()
}
const Common = (state = initState, action) => {
    let nextState = state
    switch (action.type) {
        case AuthEventTypes.LOGIN_SUCCESS:
            console.log('ok google')
            saveToken(action.payload)
            nextState = {
                ...state,
                isAppLoad: false,
                token: action.payload,
                user: null,
                forceRedirectTo : "/"
            }
            break;
        case AuthEventTypes.TOKEN_VALID:
            nextState = { ...state, user: action.payload, isAppLoad: true }
            break;
        case AuthEventTypes.TOKEN_IN_VALID:
            nextState = { ...state, forceRedirectTo: '/login', isAppLoad: true }
            break;
        case RouterTypes.Redirect:
            nextState = { ...state, forceRedirectTo: action.payload }
            break;
        case RouterTypes.CLEAR_REDIRECT_URL:
            console.log('clear')
            nextState = { ...state, forceRedirectTo: null }
            break;
    }
    console.log(action)
    console.log(nextState)
    return nextState
}
export default Common