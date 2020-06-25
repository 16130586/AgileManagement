import { Auth as AuthEventTypes, ASYNC as AsyncEventTypes,Router as RouterTypes } from '../constants/index'
import { saveToken, getToken, clearToken } from '../common/localStorage'
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
            clearToken()
            nextState = { ...state, forceRedirectTo: '/login', isAppLoad: true }
            break;
        case AsyncEventTypes.REQUEST.CREATE_PROJECT_SUCCESS:
            console.log('don know wwhy')
            nextState = { ...state, forceRedirectTo: `/project/${action.payload.id}`, isAppLoad: true }
            break;
        case RouterTypes.Redirect:
            nextState = { ...state, forceRedirectTo: action.payload }
            break;
        case RouterTypes.CLEAR_REDIRECT_URL:
            nextState = { ...state, forceRedirectTo: null }
            break;
    }
    console.log(action)
    console.log(nextState)
    return nextState
}
export default Common